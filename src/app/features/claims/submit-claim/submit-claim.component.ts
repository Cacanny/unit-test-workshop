import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacadeService } from '../../../store/facade.service';
import { Creature } from '../../../store/insura-quest.types';

@Component({
  selector: 'app-submit-claim',
  standalone: false,
  templateUrl: './submit-claim.component.html',
})
export class SubmitClaimComponent implements OnInit {
  facadeService = inject(FacadeService);
  destroy$ = inject(DestroyRef);

  claimForm: FormGroup = new FormGroup(
    {
      creature: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      amount: new FormControl('', [Validators.required, Validators.min(0.01)]),
    },
    { updateOn: 'blur' },
  );

  options: { key: string; value: number }[] = [];

  loadingStatus$ = this.facadeService.submitClaimStatus$;

  ngOnInit(): void {
    this.facadeService.creatures$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((creatures) => {
        this.options = this.createOptionList(creatures);
      });

    this.loadingStatus$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isSuccess) {
          this.claimForm.reset();
        }
      });
  }

  onSubmit(): void {
    if (this.claimForm.valid) {
      this.facadeService.submitClaim(this.claimForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  createOptionList(creatures: Creature[]): { key: string; value: number }[] {
    return creatures.map((creature) => ({
      key: creature.name,
      value: creature.id,
    }));
  }

  get creature() {
    return this.claimForm.controls['creature'];
  }

  get description() {
    return this.claimForm.controls['description'];
  }

  get amount() {
    return this.claimForm.controls['amount'];
  }

  get title() {
    return this.claimForm.controls['title'];
  }
}
