// Defines the elements of an order to be made
import React from 'react';


export default class Order {
  constructor({items = [], total = 0, notes = '', address = '', name = ''}) {
    this.items = items;
    this.total = total;
    this.notes = notes;
    this.address = address
  }

  //might not be nedded!
  //this Item will be an item object!
  addItem(item) {
    this.items.push(item);
    this.total += item.price * item.quantitySelected;
  }


  //removes an item fom the list.
  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantitySelected, 0);
  }

  clear() {
    this.items = [];
    this.total = 0;
    this.notes = '';
  }
}