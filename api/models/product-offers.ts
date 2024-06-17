import mongoose from "mongoose";
const ProductOffers = new mongoose.Schema({
    "createdAt": {
      "$date": {
        "type": "Date"
      }
    },
    "updatedAt": {
      "$date": {
        "type": "Date"
      }
    },
    "marketplaceId": {
      "type": "String"
    },
    "Identifier": {
      "ASIN": {
        "type": "String"
      },
      "MarketplaceId": {
        "type": "String"
      },
      "ItemCondition": {
        "type": "String"
      }
    },
    "ASIN": {
      "type": "String"
    },
    "Summary": {
      "BuyBoxEligibleOffers": {
        "type": [
          "Mixed"
        ]
      },
      "LowestPrices": {
        "type": [
          "Mixed"
        ]
      },
      "BuyBoxPrices": {
        "type": [
          "Mixed"
        ]
      },
      "CompetitivePriceThreshold": {
        "CurrencyCode": {
          "type": "String"
        },
        "Amount": {
          "type": "Number"
        }
      },
      "NumberOfOffers": {
        "type": [
          "Mixed"
        ]
      },
      "ListPrice": {
        "CurrencyCode": {
          "type": "String"
        },
        "Amount": {
          "type": "Number"
        }
      },
      "TotalOfferCount": {
        "type": "Number"
      },
      "SalesRankings": {
        "type": [
          "Mixed"
        ]
      }
    },
    "Offers": {
      "type": [
        "Mixed"
      ]
    },
    "status": {
      "type": "String"
    },
    "ItemCondition": {
      "type": "String"
    }
  })

  export default mongoose.models?.product_offers || mongoose.model("product_offers", ProductOffers);