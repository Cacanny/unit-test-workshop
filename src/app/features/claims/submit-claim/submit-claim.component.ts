import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../../store/feature/insura-quest.feature';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Creature } from '../../../store/insura-quest.types';
import { InsuraQuestActions } from '../../../store/actions/insura-quest.actions';

@Component({
  selector: 'app-submit-claim',
  standalone: false,
  templateUrl: './submit-claim.component.html',
})
export class SubmitClaimComponent implements OnInit {
  store = inject(Store);
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

  options: { key: string; value: string }[] = [];

  loadingStatus$ = this.store.select(
    insuraQuestFeature.selectSubmitClaimStatus,
  );

  ngOnInit(): void {
    this.store
      .select(insuraQuestFeature.selectCreatures)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((creatures) => {
        this.options = this.createOptionList(creatures);
      });

    this.store
      .select(insuraQuestFeature.selectSubmitClaimStatus)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isSuccess) {
          this.claimForm.reset();
        }
      });
  }

  onSubmit(): void {
    if (this.claimForm.valid) {
      this.store.dispatch(
        InsuraQuestActions.submitClaim({ claim: this.claimForm.value }),
      );
    } else {
      console.log('Form is invalid');
    }
  }

  createOptionList(creatures: Creature[]): { key: string; value: string }[] {
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
