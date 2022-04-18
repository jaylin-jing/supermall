import { requestNew } from './request.js'

export function getDetail(iid) {
  return requestNew({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.services = shopInfo.services;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.score = shopInfo.score;
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
  }
}

export class Param {
  constructor(info, rule) {
    this.info = info.set;
    this.rule = rule.tables;
  }
}

export function getRecommend() {
  return requestNew({
    url: '/recommend'
  })
}

