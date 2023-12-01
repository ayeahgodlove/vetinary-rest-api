import { Order } from "../../entities/order";
import { IOrder } from "../../../domain/models/order";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IOrderRepository } from "../contracts/repository.base";

export class OrderRepository implements IOrderRepository {
  /**
   *
   */
  constructor() {}
  findByName(name: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Receives a Order as parameter
   * @order
   * returns void
   */
  async create(order: IOrder): Promise<Order> {
    try {
      return await Order.create<Order>({...order});
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Order
   */
  async findById(id: string): Promise<Order | null> {
    try {
      const orderItem = await Order.findByPk(id);
      if (!orderItem) {
        throw new NotFoundException("Order", id);
      }
      return orderItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @orderNo
   * returns Order
   */
  async findByOrderNo(orderNo: string): Promise<Order | null> {
    try {
      const orderItem = await Order.findOne({ where: { orderNo } });
      return orderItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Order
   */
  async getAll(): Promise<Order[]> {
    try {
      const orders = await Order.findAll();
      return orders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Order as parameter
   * @order
   * returns void
   */
  async update(order: IOrder): Promise<Order> {
    const { id } = order;
    try {
      const orderItem = await Order.findByPk(id);
      
      if (!orderItem) {
        throw new NotFoundException("Order", id.toString());
      }

      return await orderItem.update(order);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const orderItem = await Order.findByPk(id);
      if (!orderItem) {
        throw new NotFoundException("Order", id);
      }
      await orderItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
