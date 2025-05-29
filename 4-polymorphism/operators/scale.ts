type Scale = 'rad' | 'deg';

export class OperatorScale {
  private scale: Scale = 'rad';

  public toggleScale() {
    this.scale = this.scale === 'rad' ? 'deg' : 'rad';
  }

  public getScale(): Scale {
    return this.scale;
  }
}
