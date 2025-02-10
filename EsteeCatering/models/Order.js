// Defines the elements of an order to be made
import React from 'react';
import {v4 as uuidv4} from 'uuid';


export default class Order {
  constructor({id= uuidv4().slice(0,6),items = [], total = 0, notes = '', name = '',address = '',phoneNumber = ''}) {
    this.id = id;
    this.items = items;
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantitySelected, 0);
    this.notes = notes;
    this.address = address
    this.name = name;
    this.phoneNumber = phoneNumber;
    
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