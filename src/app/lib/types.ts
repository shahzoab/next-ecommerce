/**
 * Represents a product.
 * @interface ProductType
 */
export interface ProductType {
  /**
   * Unique identifier of the product.
   * @type {number}
   */
  id: number;
  /**
   * Colour of the product.
   * @type {string}
   */
  colour: string;
  /**
   * Name of the product.
   * @type {string}
   */
  name: string;
  /**
   * Price of the product.
   * @type {number}
   */
  price: number;
  /**
   * URL of the product image.
   * @type {string}
   */
  img: string;
  /**
   * Quantity of the product in stock.
   * @type {number}
   */
  quantity: number;
}
