/**
   * Administrivia: JavaScript primitive types, or "things that toString() predictably".
   */
export type Primitive = number | string | boolean;
export type Null = null|undefined;
export type Complex = object | any[];
export type ComposedType = Primitive|Null|Complex;


export type IBoxSize = {
  width: number;
  height: number;
};
