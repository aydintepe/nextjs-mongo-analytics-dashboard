import mongoose from "mongoose";
const CatalogItem = new mongoose.Schema(
{
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
    "asin": {
      "type": "String"
    },
    "attributes": {
      "item_weight": {
        "type": [
          "Mixed"
        ]
      },
      "bullet_point": {
        "type": [
          "Mixed"
        ]
      },
      "item_package_quantity": {
        "type": [
          "Mixed"
        ]
      },
      "item_dimensions": {
        "type": [
          "Mixed"
        ]
      },
      "brand": {
        "type": [
          "Mixed"
        ]
      },
      "color_rendering_index": {
        "type": [
          "Mixed"
        ]
      },
      "control_method": {
        "type": [
          "Mixed"
        ]
      },
      "bulb": {
        "type": [
          "Mixed"
        ]
      },
      "externally_assigned_product_identifier": {
        "type": [
          "Mixed"
        ]
      },
      "package_level": {
        "type": [
          "Mixed"
        ]
      },
      "item_package_dimensions": {
        "type": [
          "Mixed"
        ]
      },
      "size": {
        "type": [
          "Mixed"
        ]
      },
      "part_number": {
        "type": [
          "Mixed"
        ]
      },
      "style": {
        "type": [
          "Mixed"
        ]
      },
      "light_source": {
        "type": [
          "Mixed"
        ]
      },
      "pattern": {
        "type": [
          "Mixed"
        ]
      },
      "light_color": {
        "type": [
          "Mixed"
        ]
      },
      "manufacturer": {
        "type": [
          "Mixed"
        ]
      },
      "light_type": {
        "type": [
          "Mixed"
        ]
      },
      "model_number": {
        "type": [
          "Mixed"
        ]
      },
      "supplier_declared_dg_hz_regulation": {
        "type": [
          "Mixed"
        ]
      },
      "item_name": {
        "type": [
          "Mixed"
        ]
      },
      "list_price": {
        "type": [
          "Mixed"
        ]
      },
      "batteries_required": {
        "type": [
          "Mixed"
        ]
      },
      "incandescent_equivalent_wattage": {
        "type": [
          "Mixed"
        ]
      },
      "product_site_launch_date": {
        "type": [
          "Mixed"
        ]
      },
      "batteries_included": {
        "type": [
          "Mixed"
        ]
      },
      "connectivity_technology": {
        "type": [
          "Mixed"
        ]
      },
      "color_temperature": {
        "type": [
          "Mixed"
        ]
      },
      "included_components": {
        "type": [
          "Mixed"
        ]
      },
      "fcc_radio_frequency_emission_compliance": {
        "type": [
          "Mixed"
        ]
      },
      "model_name": {
        "type": [
          "Mixed"
        ]
      },
      "specification_met": {
        "type": [
          "Mixed"
        ]
      },
      "power_consumption": {
        "type": [
          "Mixed"
        ]
      },
      "item_type_keyword": {
        "type": [
          "Mixed"
        ]
      },
      "number_of_items": {
        "type": [
          "Mixed"
        ]
      },
      "warranty_description": {
        "type": [
          "Mixed"
        ]
      },
      "is_electric": {
        "type": [
          "Mixed"
        ]
      },
      "specific_uses_for_product": {
        "type": [
          "Mixed"
        ]
      },
      "pesticide_marking": {
        "type": [
          "Mixed"
        ]
      },
      "color": {
        "type": [
          "Mixed"
        ]
      },
      "variation_theme": {
        "type": [
          "Mixed"
        ]
      },
      "item_package_weight": {
        "type": [
          "Mixed"
        ]
      },
      "customer_package_type": {
        "type": [
          "Mixed"
        ]
      },
      "wattage": {
        "type": [
          "Mixed"
        ]
      },
      "controller_type": {
        "type": [
          "Mixed"
        ]
      },
      "item_shape": {
        "type": [
          "Mixed"
        ]
      },
      "indoor_outdoor_usage": {
        "type": [
          "Mixed"
        ]
      },
      "special_feature": {
        "type": [
          "Mixed"
        ]
      },
      "power_source_type": {
        "type": [
          "Mixed"
        ]
      },
      "voltage": {
        "type": [
          "Mixed"
        ]
      },
      "brightness": {
        "type": [
          "Mixed"
        ]
      },
      "material": {
        "type": [
          "Mixed"
        ]
      },
      "item_width_height": {
        "type": [
          "Mixed"
        ]
      },
      "white_brightness": {
        "type": [
          "Mixed"
        ]
      },
      "unit_count": {
        "type": [
          "Mixed"
        ]
      }
    },
    "classifications": {
      "type": [
        "Mixed"
      ]
    },
    "dimensions": {
      "type": [
        "Mixed"
      ]
    },
    "identifiers": {
      "type": [
        "Mixed"
      ]
    },
    "images": {
      "type": [
        "Mixed"
      ]
    },
    "productTypes": {
      "type": [
        "Mixed"
      ]
    },
    "relationships": {
      "type": [
        "Mixed"
      ]
    },
    "salesRanks": {
      "type": [
        "Mixed"
      ]
    },
    "summaries": {
      "type": [
        "Mixed"
      ]
    }
  })


export default mongoose.models?.catalog_items || mongoose.model("catalog_items", CatalogItem);