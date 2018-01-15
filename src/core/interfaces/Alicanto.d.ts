declare namespace Alicanto {
  export namespace Models {
    export interface I18n {
      defaultText: string;
      description?: string;
    }

    export interface UISettings {
      link?: string;
      imageUrl?: string;
      isVisible?: boolean;
    }

    export interface Link {
      title: {
        i18n: I18n;
      };
      text: {
        i18n: I18n;
      };
    }

    export interface UI {
      common?: {
        footerLinks: {
          description: string;
          items: {
            [key: string]: {
              title: {
                i18n: I18n;
              };
              links: {
                [key: string]: Link;
              };
            };
          };
        };
        footerContacts: {
          contacts: {
            zip: {
              i18n: I18n;
            };
            address: {
              i18n: I18n;
            };
            city: {
              i18n: I18n;
            };
            country: {
              i18n: I18n;
            };
            phone: {
              i18n: I18n;
              settings: UISettings;
            };
          };
        };
        footerCopyright: {
          text: {
            i18n: I18n;
          };
        };
        headerLogo: {
          title: {
            i18n: I18n;
          };
        };
        headerSearchForm: {
          placeholder: {
            i18n: I18n;
          };
        };
        catalogSearchForm: {
          placeholder: {
            i18n: I18n;
          };
        };
        generalLinks: {
          catalog: {
            i18n: I18n;
          };
          delivery: {
            i18n: I18n;
          };
          about: {
            i18n: I18n;
          };
          logout: {
            i18n: I18n;
          };
          advancedSearch: {
            i18n: I18n;
          };
          collections: {
            i18n: I18n;
          };
          cart: {
            i18n: I18n;
          };
          userProfile: {
            i18n: I18n;
          };
          signIn: {
            i18n: I18n;
          };
          account: {
            i18n: I18n;
          };
          purchases: {
            i18n: I18n;
            settings: UISettings;
          };
          orders: {
            i18n: I18n;
            settings: UISettings;
          };
        };
        breadcrumbs: {
          home: {
            i18n: I18n;
          };
          collections: {
            i18n: I18n;
          };
          cart: {
            i18n: I18n;
          };
        };
        tables: {
          description: string;
          cells: {
            title: {
              i18n: I18n;
            };
            author: {
              i18n: I18n;
            };
            cost: {
              i18n: I18n;
            };
            quantity: {
              i18n: I18n;
            };
            desc: {
              i18n: I18n;
            };
            status: {
              i18n: I18n;
            };
            date: {
              i18n: I18n;
            };
            itemsCount: {
              i18n: I18n;
            };
            total: {
              i18n: I18n;
            };
            image: {
              i18n: I18n;
            };
            name: {
              i18n: I18n;
            };
            count: {
              i18n: I18n;
            };
            price: {
              i18n: I18n;
            };
            actions: {
              i18n: I18n;
            };
          };
        };
        buttons: {
          readMore: {
            i18n: I18n;
          };
          goToCart: {
            i18n: I18n;
          };
          addToCart: {
            i18n: I18n;
          };
          buyNow: {
            i18n: I18n;
          };
          continueShopping: {
            i18n: I18n;
          };
          showMore: {
            i18n: I18n;
          };
          nextStep: {
            i18n: I18n;
          };
          prevStep: {
            i18n: I18n;
          };
          confirm: {
            i18n: I18n;
          };
          pay: {
            i18n: I18n;
          };
        };
        tagsProduct: {
          sale: {
            i18n: I18n;
          };
          new: {
            i18n: I18n;
          };
        };
        filters: {
          ordering: {
            title: {
              i18n: I18n;
            };
            items: {
              orderingById: {
                i18n: I18n;
              };
              orderingByPrice: {
                i18n: I18n;
              };
              orderingByName: {
                i18n: I18n;
              };
            };
          };
          includeSubcaterogies: {
            title: {
              i18n: I18n;
            };
          };
          inStock: {
            title: {
              i18n: I18n;
            };
            state: {
              trueState: {
                i18n: I18n;
              };
              falseState: {
                i18n: I18n;
              };
            };
          };
          prices: {
            title: {
              i18n: I18n;
            };
          };
          categories: {
            title: {
              i18n: I18n;
            };
            items: {
              allCategories: {
                i18n: I18n;
              };
              category1: {
                i18n: I18n;
              };
              category2: {
                i18n: I18n;
              };
            };
          };
        };
        forms: {
          description: string;
          validation: {
            cardNumber: {
              i18n: I18n;
            };
            expDate: {
              i18n: I18n;
            };
            notEmpty: {
              i18n: I18n;
            };
            email: {
              i18n: I18n;
            };
            minLengths: {
              6: {
                i18n: I18n;
              };
            };
          };
        };
        noImage: {
          description: string;
          title: {
            i18n: I18n;
          };
        };
        categoriesMenu: {
          copyright: {
            description: string;
            text: {
              i18n: I18n;
            };
          };
        };
        locales: {
          description: string;
          items: {
            [key: string]: { i18n: I18n };
          };
        };
      };
      routes?: {
        description: string;
        allCategories: {
          title: {
            i18n: I18n;
          };
        };
        cart: {
          description: string;
          title: {
            i18n: I18n;
          };
          emptyStatus: {
            i18n: I18n;
          };
          total: {
            i18n: I18n;
          };
          tabs: {
            order: {
              i18n: I18n;
            };
            delivery: {
              i18n: I18n;
            };
            confirm: {
              i18n: I18n;
            };
            payment: {
              i18n: I18n;
            };
          };
          errors: {
            fewerThanOne: {
              i18n: I18n;
            };
            moreThanInBalance: {
              i18n: I18n;
            };
            anonCheckout: {
              i18n: I18n;
            };
          };
          checkout: {
            i18n: I18n;
          };
          privacy: {
            i18n: I18n;
          };
          agree: {
            i18n: I18n;
          };
          userInfoForm: {
            inputs: {
              name: {
                i18n: I18n;
              };
              surname: {
                i18n: I18n;
              };
              email: {
                i18n: I18n;
              };
              phoneNumber: {
                i18n: I18n;
              };
              country: {
                i18n: I18n;
              };
              stateRegion: {
                i18n: I18n;
              };
              zipCode: {
                i18n: I18n;
              };
              address: {
                i18n: I18n;
              };
            };
          };
          confirm: {
            labels: {
              purchaser: {
                i18n: I18n;
              };
              phoneNumber: {
                i18n: I18n;
              };
              email: {
                i18n: I18n;
              };
              address: {
                i18n: I18n;
              };
            };
          };
          paymentForm: {
            title: {
              i18n: I18n;
            };
            submit: {
              i18n: I18n;
            };
            label: {
              i18n: I18n;
            };
            inputs: {
              cardNumber: {
                i18n: I18n;
              };
              expDate: {
                i18n: I18n;
              };
              cardholderName: {
                i18n: I18n;
              };
              securityCode: {
                i18n: I18n;
              };
              expDatePlaceholderMonth: {
                i18n: I18n;
              };
              expDatePlaceholderYear: {
                i18n: I18n;
              };
            };
          };
        };
        catalog: {
          description: string;
          header: {
            i18n: I18n;
          };
          count: {
            i18n: I18n;
          };
          filters: {
            allCategories: {
              i18n: I18n;
            };
            emptyTxt: {
              i18n: I18n;
            };
            header: {
              i18n: I18n;
            };
          };
          orderings: {
            label: {
              i18n: I18n;
            };
          };
          addedToCart: {
            i18n: I18n;
          };
        };
        home: {
          description: string;
          aboutUs: {
            header: {
              i18n: I18n;
            };
            items: { [key: string]: { i18n: I18n } };
          };
          feedback: {
            form: {
              header: {
                i18n: I18n;
              };
              button: {
                i18n: I18n;
              };
              text: {
                i18n: I18n;
              };
              answText: {
                i18n: I18n;
              };
              labels: {
                message: {
                  i18n: I18n;
                };
                name: {
                  i18n: I18n;
                };
                email: {
                  i18n: I18n;
                };
              };
              successMessage: {
                i18n: I18n;
              };
            };
          };
          libraryStats: {
            header: {
              i18n: I18n;
            };
            autors: {
              i18n: I18n;
            };
            pressPublic: {
              i18n: I18n;
            };
            manuscript: {
              i18n: I18n;
            };
            thesis: {
              i18n: I18n;
            };
          };
          partners: {
            header: {
              i18n: I18n;
            };
            items: {
              [key: string]: {
                name: {
                  i18n: I18n;
                };
                settings: UISettings;
              };
            };
          };
          slider: {
            items: {
              [key: string]: {
                header: {
                  i18n: I18n;
                  settings: UISettings;
                };
                text: {
                  i18n: I18n;
                  settings: UISettings;
                };
                price: {
                  i18n: I18n;
                  settings: UISettings;
                };
                tag: {
                  i18n: I18n;
                  settings: UISettings;
                };
                image: {
                  settings: UISettings;
                };
              };
            };
          };
          topMenu: {
            links: {
              newAdd: {
                i18n: I18n;
              };
              about: {
                i18n: I18n;
              };
              partners: {
                i18n: I18n;
              };
              contact: {
                i18n: I18n;
              };
            };
          };
          textBlock: {
            title: {
              i18n: I18n;
            };
            subtitle: {
              i18n: I18n;
            };
            text: {
              i18n: I18n;
            };
          };
          popularBlock: {
            title: {
              i18n: I18n;
            };
            viewAll: {
              i18n: I18n;
            };
          };
        };
        login: {
          description: string;
          form: {
            buttons: {
              signIn: {
                i18n: I18n;
              };
              registration: {
                i18n: I18n;
                settings: UISettings;
              };
            };
            labels: {
              password: {
                i18n: I18n;
              };
              username: {
                i18n: I18n;
              };
            };
          };
        };
        notFound: {
          description: string;
          title: {
            i18n: I18n;
          };
          text: {
            i18n: I18n;
          };
          return: {
            i18n: I18n;
          };
          link: {
            i18n: I18n;
          };
        };
        productCard: {
          description: string;
          button: {
            i18n: I18n;
          };
          outOfStock: {
            i18n: I18n;
          };
          bundlesTitle: {
            i18n: I18n;
          };
          share: {
            i18n: I18n;
          };
          popup: {
            header: {
              i18n: I18n;
            };
            buttons: {
              cart: {
                i18n: I18n;
              };
              continue: {
                i18n: I18n;
              };
            };
          };
          labels: {
            language: {
              i18n: I18n;
            };
            yearOfIssue: {
              i18n: I18n;
            };
            publisher: {
              i18n: I18n;
            };
            documentType: {
              i18n: I18n;
            };
          };
          socialLinks: {
            description: string;
            items: {
              facebook: {
                i18n: I18n;
                settings: UISettings;
              };
              twitter: {
                i18n: I18n;
                settings: UISettings;
              };
              vkontakte: {
                i18n: I18n;
                settings: UISettings;
              };
              instagram: {
                i18n: I18n;
                settings: UISettings;
              };
            };
          };
          previewImages: {
            description: string;
            cropper: {
              description: string;
              settings: UISettings;
            };
            slider: {
              description: string;
              settings: UISettings;
            };
          };
        };
        user: {
          description: string;
          account: {
            description: string;
            title: {
              i18n: I18n;
            };
            button: {
              i18n: I18n;
            };
            form: {
              description: string;
              labels: {
                email: {
                  i18n: I18n;
                };
                name: {
                  i18n: I18n;
                };
                surname: {
                  i18n: I18n;
                };
              };
              submit: {
                i18n: I18n;
              };
            };
          };
          purchases: {
            description: string;
            emptyStatus: {
              i18n: I18n;
            };
            count: {
              i18n: I18n;
            };
            title: {
              i18n: I18n;
            };
          };
          orders: {
            description: string;
            emptyStatus: {
              i18n: I18n;
            };
            transaction: {
              status: {
                i18n: I18n;
              };
              details: {
                i18n: I18n;
              };
            };
            button: {
              i18n: I18n;
            };
            status: {
              i18n: I18n;
            };
            count: {
              i18n: I18n;
            };
            title: {
              i18n: I18n;
            };
            paymentSuccess: {
              i18n: I18n;
            };
            paymentWarning: {
              i18n: I18n;
            };
            labels: {
              date: {
                i18n: I18n;
              };
              totalCount: {
                i18n: I18n;
              };
              totalPrice: {
                i18n: I18n;
              };
            };
          };
          orderDetails: {
            labels: {
              count: {
                i18n: I18n;
              };
              cost: {
                i18n: I18n;
              };
            };
          };
        };
      };
    }

    export interface Category {
      id: number;
      uid: string;
      name: string;
      subcategories?: Category[];
    }

    export interface Filter {
      label: string;
      field_slug: string;
      widget_name: string;
      filter_type: string;
      value_type: string;
      category?: string | null;
    }

    export interface Meta {
      isLoadable?: boolean;
      title?: string;
      description?: string;
      keywords?: string;
    }

    export interface Group {
      slug: string;
      type: string;
      content: Category[] | CatalogItem[];
    }

    export interface Page {
      content: string;
    }

    export interface CatalogItemSchemaFields {
      price?: {
        value: number;
        label: string;
        type: string;
      };
      author?: {
        value: string;
        in_list?: boolean;
        label: string;
        type: string;
      };
      name?: {
        value: string;
        label: string;
        type: string;
      };
      picture_url?: {
        value: string;
        label: string;
        type: string;
        // in_list: boolean; // непонятно, что означает?
      };
      short_description?: {
        value: string;
        label: string;
        type: string;
      };
      description?: {
        value: string;
        label: string;
        type: string;
      };
      shop_url?: {
        label: string;
        type: string;
        value: string;
        in_list?: boolean;
      };
      currency?: {
        value: string;
        label: string;
        type: string;
      };
      isbn?: {
        value: string;
        label: string;
        type: string;
        in_list?: boolean;
      };
      in_stock?: {
        label: string;
        type: string;
        value: boolean;
      };
      ebook_type?: {
        label: string;
        type: string;
        value: string;
        in_list?: boolean;
      };
    }

    export interface Cart {
      id: number;
      total: number;
      modified: string;
      items_count: number;
      items: CatalogItem[];
    }

    export interface User {
      email: string;
      first_name: string;
      last_name: string;
    }

    export interface Order {
      id: number;
      uid?: string;
      cart: Cart;
      status: string;
      transaction_status: string;
      transaction_details: string;
      is_paid: boolean;
    }

    export interface Picture {
      id: number;
      url: string;
      is_main: boolean;
      width: number;
      height: number;
      alt: string;
    }

    // + - catalog
    // ! - catalog/uid
    export interface CatalogItem {
      id?: number; // identifier item in cart, use only in cart
      item?: string; // TODO: item === uid, deprecated use uid
      uid: string; // identifier catalog item

      count?: number; // count in cart
      modified?: string; // modified date

      in_stock?: boolean; // есть в наличае TODO: deprecated
      is_deleted?: boolean; // TODO: deprecated

      schema_fields: CatalogItemSchemaFields;

      was_acquired_before?: boolean; // + ! покупал ли этот товар

      is_bundle?: boolean; // + !
      bundle_content?: CatalogItem[]; // + !

      categories?: Category[];
      modifications?: CatalogItem[];

      balance?: number; // !
      is_unlimited?: boolean; // !

      pictures?: Picture[]; // !
      main_picture_url?: string; // TODO: new

      blockedIncreasing?: boolean; // TODO: WTF? 0_o
      isCartPopupOpened?: boolean; // TODO: WTF? 0_o
    }

    export interface Routes {
      [key: string]: {
        robots?: {
          Allow: boolean;
          Disallow: boolean;
        };
        sitemap?: {
          changefreq: string;
          priority: number;
        };
        meta?: Meta;
        routes?: Routes;
      };
    }

    export interface Locales {
      language_codes: string[];
      main_language_code: string;
    }

    export interface Robots {
      value: string[];
    }

    export interface Sitemap {
      cacheTime: number;
    }
  }

  export namespace API {
    export interface CatalogFilter {
      categories__in?: number[];
      in_stock__eq?: boolean;
      include_subcategories__eq?: boolean;
      price__range?: [number, number];
    }

    export interface PaginationParams {
      page?: string;
      page_size?: string;
    }

    export interface PaginationResponse<M> {
      count: number;
      next: string | null;
      previous: string | null;
      results: M[];
    }

    // POST /v1/shop/auth/login/
    export interface POST_AUTH_LOGIN_BODY {
      password: string;
      username: string;
    }

    export interface POST_AUTH_LOGIN_RESPONSE {
      token: string;
    }

    // POST /v1/shop/auth/refresh-token/
    export interface POST_AUTH_REFRESH_TOKEN_BODY {
      token: string;
    }

    export interface POST_AUTH_REFRESH_TOKEN_RESPONSE {
      token: string;
    }

    // GET /v1/shop/catalog/
    export interface GET_CATALOG_PARAMS extends PaginationParams {
      ordering?: string;
      filter?: string;
      search?: string;
    }

    export interface GET_CATALOG_RESPONSE extends PaginationResponse<Models.CatalogItem> {}

    // GET /v1/shop/catalog/categories/
    export interface GET_CATALOG_CATEGORIES_PARAMS extends PaginationParams {}

    export interface GET_CATALOG_CATEGORIES_RESPONSE extends PaginationResponse<Models.Category> {}

    // GET /v1/shop/catalog/categories/{uid}
    export interface GET_CATALOG_CATEGORIES_UID_PARAMS {
      uid: string;
    }

    export interface GET_CATALOG_CATEGORIES_UID_RESPONSE extends Models.Category {}

    // GET /v1/shop/catalog/filters/
    export interface GET_CATALOG_FILTERS_PARAMS extends PaginationParams {
      categories__in: string;
    }

    export interface GET_CATALOG_FILTERS_RESPONSE extends PaginationResponse<Models.Filter> {}

    // GET /v1/shop/catalog/groups/
    export interface GET_CATALOG_GROUPS_PARAMS extends PaginationParams {}

    export interface GET_CATALOG_GROUPS_RESPONSE extends PaginationResponse<Models.Group> {}

    // GET /v1/shop/catalog/groups/{slug}
    export interface GET_CATALOG_GROUPS_SLUG_PARAMS {
      slug: string;
    }

    export interface GET_CATALOG_GROUPS_SLUG_RESPONSE extends Models.Group {}

    // GET /v1/shop/catalog/{uid}
    export interface GET_CATALOG_UID_PARAMS {
      uid: string;
    }

    export interface GET_CATALOG_UID_RESPONSE extends Models.CatalogItem {}

    // GET /v1/shop/config
    export interface GET_CONFIG_PARAMS {}

    export interface GET_CONFIG_RESPONSE<UI, Locales, Groupings, Filters, Routes, Meta, Robots, Sitemap> {
      ui: UI;
      locales: Locales;
      groupings: Groupings; // deprecated or not released yet?
      filters: Filters; // deprecated or not released yet?
      routes: Routes;
      meta: Meta;
      robots: Robots;
      sitemap: Sitemap;
    }

    // POST /v1/shop/mailing/contact-form/
    export interface POST_MAILING_CONTACT_FORM_BODY {
      message: string;
      name: string;
      email: string;
    }

    export interface POST_MAILING_CONTACT_FORM_RESPONSE {}

    // GET /v1/shop/pages/{slug}
    export interface GET_PAGES_SLUG_PARAMS {
      slug: string;
    }

    export interface GET_PAGES_SLUG_RESPONSE extends Models.Page {}

    // GET /v1/shop/seo/data/
    export interface GET_SEO_DATA_PARAMS {}

    export interface GET_SEO_DATA_RESPONSE extends Models.Meta {}

    // GET /v1/shop/cart/current/
    export interface GET_CART_CURRENT_PARAMS extends PaginationParams {}

    export interface GET_CART_CURRENT_RESPONSE {
      id: number;
      total: string; // number in Models.Cart
      modified: string;
      items_count: number;
      items: Models.CatalogItem[];
    }

    // PUT /v1/shop/cart/current
    export interface PUT_CART_CURRENT_BODY {
      items: {
        count: number;
        item: string;
      }[];
    }

    // GET /v1/shop/cart/current/items/
    export interface GET_CART_CURRENT_ITEMS_RESPONSE {
      results: Models.CatalogItem[];
    }

    // POST /v1/shop/current/items/
    export interface POST_CART_CURRENT_ITEMS_BODY {
      count: number;
      item: string;
    }

    export interface POST_CART_CURRENT_ITEMS_RESPONSE extends Models.CatalogItem {}

    // GET /v1/shop/cart/current/items/{id}
    export interface GET_CART_CURRENT_ITEMS_ID_RESPONSE {}

    // PUT /v1/shop/cart/current/items/{id}
    export interface PUT_CART_CURRENT_ITEMS_ID_BODY {
      count: number;
      item: string;
    }

    // GET /v1/shop/cart/paid/items
    export interface GET_CART_PAID_ITEMS_RESPONSE extends PaginationResponse<Models.CatalogItem> {}

    // GET /v1/shop/user
    export interface GET_USER_RESPONSE extends Models.User {}

    // PUT /v1/shop/user
    export interface PUT_USER_BODY extends Models.User {
      password?: string;
    }

    export interface PUT_USER_RESPONSE extends Models.User {}

    // GET /v1/shop/user/orders/
    export interface GET_USER_ORDERS_PARAMS extends PaginationParams {}

    export interface GET_USER_ORDERS_RESPONSE extends PaginationResponse<Models.Order> {}

    // POST /v1/shop/user/orders/
    export interface POST_USER_ORDERS_BODY {
      cart: number; // cart id must be number!
    }

    export interface POST_USER_ORDERS_RESPONSE {}

    // POST /v1/shop/payments/pay/
    export interface POST_PAYMENTS_PAY_BODY {
      order: string;
      service?: string;
      client_ip?: string;
    }

    export interface POST_PAYMENTS_PAY_RESPONSE {
      redirect_to: {
        redirect_url: string;
      };
    }

    // GET /v1/shop/auth/oauth/provider-url
    export interface GET_AUTH_OAUTH_PROVIDER_URL_PARAMS {}

    export interface GET_AUTH_OAUTH_PROVIDER_URL_RESPONSE {
      url: string;
      data: {
        credentials: {
          storage: string[];
          id: string[];
          distribution: string[];
          market: string[];
        };
        clientId: string;
      };
    }
  }
}
