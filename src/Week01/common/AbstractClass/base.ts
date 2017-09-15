/**
 * @class
 * @abstract
 */
abstract class AbstractFactory {
  abstract get(id: string): AbstractEntity;
  abstract set(obj: AbstractEntity);
}

abstract class AbstractEntity {
  id: string;
}
