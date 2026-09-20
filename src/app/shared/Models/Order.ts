export interface ICreateOrder {
  deliveryMethodId: number
  basketId: string
  shipAddress: IShippingAddress
}

export interface IShippingAddress {
  firstName: string
  lastName: string
  city: string
  zipCode: string
  street: string
  state: string
}


export interface IOrderItem {
  productItemId: number
  price: number
  quantity: number
  mainImage: string
  productName: string
}

export interface IOrder {
  id: number
  buyerEmail: string
  subTotal: number
  total: number
  orderDate: string
  shippingAddress: IShippingAddress
  deliveryMethod: string
  orderItems: IOrderItem[]
  status: string
}