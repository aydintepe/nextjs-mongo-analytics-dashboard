import mongoose from "mongoose";

const CompetitiveSummary = new mongoose.Schema(
  {
    ASIN: {
      "type": "String"
    },
    "Product": {
      "CompetitivePricing": {
        "CompetitivePrices": {
          "type": [
            "Mixed"
          ]
        },
        "NumberOfOfferListings": {
          "type": [
            "Mixed"
          ]
        }
      },
      "Identifiers": {
        "MarketplaceASIN": {
          "MarketplaceId": {
            "type": "String"
          },
          "ASIN": {
            "type": "String"
          }
        }
      },
      "SalesRankings": {
        "type": [
          "Mixed"
        ]
      }
    },
    "status": {
      "type": "String"
    },
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
  }
);

// This prevents Mongoose from recompiling the model.
export default mongoose.models?.competitive_summary || mongoose.model("competitive_summary", CompetitiveSummary);