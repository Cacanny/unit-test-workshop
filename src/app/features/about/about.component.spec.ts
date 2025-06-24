describe('mijn eerste testje!', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let variable: any;

  beforeEach(() => {
    variable = {};
  });

  it('should set true value to true', () => {
    // Arrange
    variable.value = false;

    // act
    variable.value = true;

    expect(variable.value).toBe(true);
  });
});
