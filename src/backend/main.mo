import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Setting = {
    name : Text;
    value : Text;
  };

  module Setting {
    public func compareByName(setting1 : Setting, setting2 : Setting) : Order.Order {
      Text.compare(setting1.name, setting2.name);
    };
  };

  type Variant = {
    name : Text;
    price : Nat;
    currency : Text;
    shippingCountries : [Text];
    specs : [Setting];
  };

  module Variant {
    public func compareByPrice(variant1 : Variant, variant2 : Variant) : Order.Order {
      Nat.compare(variant1.price, variant2.price);
    };
  };

  type Product = {
    name : Text;
    version : Text;
    apps : [Text];
    variants : [Variant];
    tags : [Text];
    notes : [Text];
    colors : [Text];
    specs : [Setting];
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };

    public func compareByVersion(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.version, product2.version);
    };
  };

  let products = Map.empty<Text, Product>();

  func initializeProducts() {
    if (products.isEmpty()) {
      let defaultProducts : [Product] = [
        //~-------------- SALAAR --------------
        {
          name = "Salaar";
          version = "2024-03";
          apps = ["Web Store"];
          tags = ["MKG-104", "Pressure Switch", "Low Voltage", "MCG"];
          notes = [
            "External pressure impulses can trigger the wires; remove wires from the system until operation.",
            "Turn off system power before connecting wires to the terminal.",
            "After assembly, switch mains power on for system operation.",
            "Display window flashes for 5 seconds upon system restart.",
            "Value can be set by turning the adjusting screw.",
            "Range: 0.3 - 4 bar.",
            "Constant/static display indicates lifelong value.",
          ];
          colors = ["white", "black"];
          specs = [
            { name = "switching current"; value = "1.5 A" },
            { name = "switching voltage"; value = "30 V" },
            { name = "certified"; value = "yes" },
          ];
          variants = [
            {
              name = "SALAAR-MCG-104";
              price = 32_490;
              currency = "HUF";
              shippingCountries = ["HU"];
              specs = [
                { name = "color"; value = "white" },
                { name = "style"; value = "standard" },
                { name = "certified"; value = "yes" },
              ];
            },
          ];
        },

        //~-------------- JUMBO --------------
        {
          name = "Jumbo";
          version = "2024-03";
          apps = ["Web Store"];
          tags = ["High End", "Low Pressure", "Pressure Switch"];
          notes = [
            "For pressure information transformation and system pressure limitation.",
            "Digital display for instant, reliable pressure value readout.",
            "Range: 0.3 - 4 bar.",
            "Display window flashes for 5 seconds upon system restart.",
            "Constant/static display indicates lifelong value.",
            "Can be adjusted between 10 mA and 2 A.",
          ];
          colors = ["black"];
          specs = [
            { name = "switching current"; value = "1.5 A" },
            { name = "switching voltage"; value = "30 V" },
            { name = "certified"; value = "yes" },
          ];
          variants = [
            {
              name = "JUMBO-LF-504";
              price = 65_490;
              currency = "HUF";
              shippingCountries = ["HU"];
              specs = [
                { name = "color"; value = "black" },
                { name = "style"; value = "high-end" },
                { name = "certified"; value = "yes" },
              ];
            },
          ];
        },

        //~-------------- MEGAMITE --------------
        {
          name = "Megamite";
          version = "2024-03";
          apps = ["Web Store"];
          tags = ["Heavy Duty", "Pressure Switch", "MCG"];
          notes = [
            "For pressure range transformation and limitation.",
            "Digital display for instant, reliable pressure value readout.",
            "Range: 0.5 - 8 bar.",
            "Can be set to max. 50 bar.",
            "Red identical display window indicates value readings.",
            "Direct readings in cmWC.",
          ];
          colors = ["black", "blue"];
          specs = [
            { name = "switching current"; value = "1.5 A" },
            { name = "switching voltage"; value = "30 V" },
            { name = "pressure range"; value = "2.8-16mb" },
            { name = "display"; value = "digital" },
          ];
          variants = [
            {
              name = "MEGAMITE-MCG-304";
              price = 74_299;
              currency = "HUF";
              shippingCountries = ["HU"];
              specs = [
                { name = "color"; value = "black" },
                { name = "style"; value = "standard" },
                { name = "certified"; value = "yes" },
              ];
            },
          ];
        },

        //~-------------- CRUZEN --------------
        {
          name = "Cruzen";
          version = "2024-03";
          apps = ["Web Store"];
          tags = ["Top Range", "Pressure Switch", "Digital Display"];
          notes = [
            "Digital display for long-range, precise value readout.",
            "For central heating units, powered by gas.",
            "Special connection capability for overpressure safety switches.",
            "Display window flashes for 5 seconds upon system restart.",
            "Constant/static display indicates lifelong value.",
            "Direct readings in mbar.",
          ];
          colors = ["white", "blue"];
          specs = [
            { name = "switching voltage"; value = "30 V" },
            { name = "switching current"; value = "2 A" },
            { name = "twist connection"; value = "detachable" },
            { name = "display"; value = "digital" },
          ];
          variants = [
            {
              name = "CRUZEN-KP-2030";
              price = 256_000;
              currency = "HUF";
              shippingCountries = ["HU"];
              specs = [
                { name = "color"; value = "white" },
                { name = "style"; value = "premium" },
                { name = "display"; value = "digital" },
              ];
            },
          ];
        },
      ];

      for (product in defaultProducts.values()) {
        products.add(product.name, product);
      };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProduct(name : Text) : async Product {
    switch (products.get(name)) {
      case (null) { Runtime.trap("Product " # name # " does not exist") };
      case (?product) { product };
    };
  };

  system func preupgrade() {};
  system func postupgrade() {
    initializeProducts();
  };
};
