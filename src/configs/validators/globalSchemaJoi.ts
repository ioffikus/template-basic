import Joi from 'joi';

const uiSettings = () =>
  Joi.object().keys({
    link: Joi.string(),
    imageUrl: Joi.string(),
    isVisible: Joi.boolean(),
  });

const i18n = () =>
  Joi.object().keys({
    defaultText: Joi.string()
      .empty('')
      .required(),
    description: Joi.string()
      .empty('')
      .required(),
  });

const uiElement = () =>
  Joi.object().keys({
    description: Joi.string(),
    i18n: i18n().required(),
    translations: Joi.object({
      key: Joi.string(),
    }).pattern(
      /\w/,
      Joi.object()
        .keys({
          i18n: i18n().required(),
        })
        .required(),
    ),
    settings: uiSettings(),
  });

const routeElement = () =>
  Joi.object().keys({
    description: Joi.string(),
    type: Joi.string(),
    sitemap: Joi.object().keys({
      changefreq: Joi.string(),
      priority: Joi.number(),
    }),
    robots: Joi.object().keys({
      Allow: Joi.boolean(),
      Disallow: Joi.boolean(),
    }),
    meta: Joi.object()
      .keys({
        isLoadable: Joi.boolean(),
        title: Joi.string(),
        description: Joi.string(),
        keywords: Joi.string(),
      })
      .required(),
  });

const linkElement = () =>
  Joi.object().keys({
    title: Joi.object().keys({ i18n: i18n().required() }),
    text: Joi.object().keys({ i18n: i18n().required() }),
  });

const linksElement = () =>
  Joi.object({
    key: Joi.string(),
  }).pattern(/\w/, linkElement().required());

module.exports = Joi.object().keys({
  name: Joi.string().required(),

  filters: Joi.object().required(),
  groupings: Joi.object().required(),

  ui: Joi.object()
    .keys({
      common: Joi.object()
        .keys({
          footerLinks: Joi.object()
            .keys({
              description: Joi.string(),
              items: Joi.object()
                .keys({
                  about: Joi.object()
                    .keys({
                      title: uiElement().required(),
                      links: linksElement().required(),
                    })
                    .required(),
                  support: Joi.object()
                    .keys({
                      title: uiElement().required(),
                      links: linksElement().required(),
                    })
                    .required(),
                  payment: Joi.object()
                    .keys({
                      title: uiElement().required(),
                      links: linksElement().required(),
                    })
                    .required(),
                })
                .required(),
            })
            .required(),
          footerContacts: Joi.object()
            .keys({
              contacts: Joi.object()
                .keys({
                  description: Joi.string(),
                  zip: uiElement().required(),
                  address: uiElement().required(),
                  city: uiElement().required(),
                  country: uiElement().required(),
                  phone: uiElement().required(),
                })
                .required(),
            })
            .required(),
          footerCopyright: Joi.object()
            .keys({
              description: Joi.string(),
              text: uiElement().required(),
            })
            .required(),

          headerLogo: Joi.object()
            .keys({
              description: Joi.string(),
              title: uiElement().required(),
            })
            .required(),
          headerSearchForm: Joi.object()
            .keys({
              description: Joi.string(),
              placeholder: uiElement().required(),
            })
            .required(),
          catalogSearchForm: Joi.object()
            .keys({
              description: Joi.string(),
              placeholder: uiElement().required(),
            })
            .required(),
          generalLinks: Joi.object()
            .keys({
              description: Joi.string(),
              catalog: uiElement().required(),
              delivery: uiElement().required(),
              about: uiElement().required(),
              logout: uiElement().required(),
              advancedSearch: uiElement().required(),
              collections: uiElement().required(),
              cart: uiElement().required(),
              userProfile: uiElement().required(),
              signIn: uiElement().required(),
              account: uiElement().required(),
              purchases: uiElement().required(),
              orders: uiElement().required(),
            })
            .required(),
          breadcrumbs: Joi.object()
            .keys({
              description: Joi.string(),
              home: uiElement().required(),
              collections: uiElement().required(),
              cart: uiElement().required(),
            })
            .required(),
          tables: Joi.object()
            .keys({
              description: Joi.string(),
              cells: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  author: uiElement().required(),
                  cost: uiElement().required(),
                  quantity: uiElement().required(),
                  desc: uiElement().required(),
                  status: uiElement().required(),
                  date: uiElement().required(),
                  itemsCount: uiElement().required(),
                  total: uiElement().required(),
                  image: uiElement().required(),
                  name: uiElement().required(),
                  count: uiElement().required(),
                  price: uiElement().required(),
                  actions: uiElement().required(),
                })
                .required(),
            })
            .required(),
          forms: Joi.object()
            .keys({
              description: Joi.string(),
              validation: Joi.object()
                .keys({
                  description: Joi.string(),
                  cardNumber: uiElement().required(),
                  expDate: uiElement().required(),
                  notEmpty: uiElement().required(),
                  email: uiElement().required(),
                  minLengths: Joi.object()
                    .keys({
                      description: Joi.string(),
                      6: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
            })
            .required(),
          buttons: Joi.object()
            .keys({
              description: Joi.string(),
              readMore: uiElement().required(),
              goToCart: uiElement().required(),
              addToCart: uiElement().required(),
              buyNow: uiElement().required(),
              continueShopping: uiElement().required(),
              showMore: uiElement().required(),
              nextStep: uiElement().required(),
              prevStep: uiElement().required(),
              confirm: uiElement().required(),
              pay: uiElement().required(),
            })
            .required(),
          tagsProduct: Joi.object()
            .keys({
              description: Joi.string(),
              sale: uiElement().required(),
              new: uiElement().required(),
            })
            .required(),
          filters: Joi.object()
            .keys({
              description: Joi.string(),
              ordering: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  items: Joi.object()
                    .keys({
                      orderingById: uiElement().required(),
                      orderingByPrice: uiElement().required(),
                      orderingByName: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              includeSubcaterogies: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                })
                .required(),
              inStock: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  state: Joi.object()
                    .keys({
                      trueState: uiElement().required(),
                      falseState: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              prices: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                })
                .required(),
              categories: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  items: Joi.object()
                    .keys({
                      allCategories: uiElement().required(),
                      category1: uiElement().required(),
                      category2: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
            })
            .required(),
          noImage: Joi.object()
            .keys({
              description: Joi.string(),
              title: uiElement().required(),
            })
            .required(),
          categoriesMenu: Joi.object()
            .keys({
              copyright: Joi.object()
                .keys({
                  description: Joi.string(),
                  text: uiElement().required(),
                })
                .required(),
            })
            .required(),
          locales: Joi.object()
            .keys({
              description: Joi.string(),
              items: Joi.object({
                key: Joi.string(),
              })
                .pattern(/\w/, uiElement().required())
                .required(),
            })
            .required(),
        })
        .required(),
      routes: Joi.object()
        .keys({
          description: Joi.string(),
          allCategories: Joi.object()
            .keys({
              title: uiElement().required(),
            })
            .required(),
          cart: Joi.object()
            .keys({
              description: Joi.string(),
              title: uiElement().required(),
              emptyStatus: uiElement().required(),
              total: uiElement().required(),
              errors: Joi.object()
                .keys({
                  description: Joi.string(),
                  fewerThanOne: uiElement().required(),
                  moreThanInBalance: uiElement().required(),
                  anonCheckout: uiElement().required(),
                })
                .required(),
              tabs: Joi.object()
                .keys({
                  order: uiElement().required(),
                  delivery: uiElement().required(),
                  confirm: uiElement().required(),
                  payment: uiElement().required(),
                })
                .required(),
              checkout: uiElement().required(),
              agree: uiElement().required(),
              userInfoForm: Joi.object()
                .keys({
                  description: Joi.string(),
                  inputs: Joi.object()
                    .keys({
                      description: Joi.string(),
                      name: uiElement().required(),
                      surname: uiElement().required(),
                      email: uiElement().required(),
                      phoneNumber: uiElement().required(),
                      country: uiElement().required(),
                      stateRegion: uiElement().required(),
                      zipCode: uiElement().required(),
                      address: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              confirm: Joi.object()
                .keys({
                  description: Joi.string(),
                  labels: Joi.object()
                    .keys({
                      description: Joi.string(),
                      purchaser: uiElement().required(),
                      email: uiElement().required(),
                      phoneNumber: uiElement().required(),
                      address: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              paymentForm: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  submit: uiElement().required(),
                  label: uiElement().required(),
                  inputs: Joi.object()
                    .keys({
                      description: Joi.string(),
                      cardNumber: uiElement().required(),
                      expDate: uiElement().required(),
                      cardholderName: uiElement().required(),
                      securityCode: uiElement().required(),
                      expDatePlaceholderMonth: uiElement().required(),
                      expDatePlaceholderYear: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
            })
            .required(),
          catalog: Joi.object()
            .keys({
              description: Joi.string(),
              header: uiElement().required(),
              count: uiElement().required(),
              filters: Joi.object()
                .keys({
                  description: Joi.string(),
                  allCategories: uiElement().required(),
                  emptyTxt: uiElement().required(),
                  header: uiElement().required(),
                })
                .required(),
              orderings: Joi.object()
                .keys({
                  label: uiElement().required(),
                })
                .required(),
              addedToCart: uiElement().required(),
            })
            .required(),
          home: Joi.object()
            .keys({
              description: Joi.string(),
              aboutUs: Joi.object()
                .keys({
                  description: Joi.string(),
                  header: uiElement().required(),
                  items: Joi.object({
                    key: Joi.string(),
                  })
                    .pattern(/\w/, uiElement().required())
                    .required(),
                })
                .required(),
              feedback: Joi.object()
                .keys({
                  description: Joi.string(),
                  form: Joi.object()
                    .keys({
                      header: uiElement().required(),
                      button: uiElement().required(),
                      text: uiElement().required(),
                      answText: uiElement().required(),
                      labels: Joi.object()
                        .keys({
                          description: Joi.string(),
                          message: uiElement().required(),
                          name: uiElement().required(),
                          email: uiElement().required(),
                        })
                        .required(),
                      successMessage: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              libraryStats: Joi.object()
                .keys({
                  description: Joi.string(),
                  header: uiElement().required(),
                  autors: uiElement().required(),
                  pressPublic: uiElement().required(),
                  manuscript: uiElement().required(),
                  thesis: uiElement().required(),
                })
                .required(),
              partners: Joi.object()
                .keys({
                  description: Joi.string(),
                  header: uiElement().required(),
                  items: Joi.object({
                    key: Joi.string(),
                  })
                    .pattern(
                      /\w/,
                      Joi.object()
                        .keys({
                          name: uiElement().required(),
                          settings: Joi.object().keys({
                            imageUrl: Joi.string().required(),
                            link: Joi.string().required(),
                          }),
                        })
                        .required(),
                    )
                    .required(),
                })
                .required(),
              topMenu: Joi.object()
                .keys({
                  description: Joi.string(),
                  links: Joi.object()
                    .keys({
                      newAdd: uiElement().required(),
                      about: uiElement().required(),
                      partners: uiElement().required(),
                      contact: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              slider: Joi.object()
                .keys({
                  description: Joi.string(),
                  items: Joi.object({
                    key: Joi.string(),
                  })
                    .pattern(
                      /\w/,
                      Joi.object()
                        .keys({
                          header: uiElement().required(),
                          text: uiElement().required(),
                          price: uiElement().required(),
                          tag: uiElement().required(),
                          image: Joi.object()
                            .keys({
                              settings: uiSettings(),
                            })
                            .required(),
                        })
                        .required(),
                    )
                    .required(),
                })
                .required(),
              textBlock: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  subtitle: uiElement().required(),
                  text: uiElement().required(),
                })
                .required(),
              popularBlock: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  viewAll: uiElement().required(),
                })
                .required(),
            })
            .required(),
          login: Joi.object()
            .keys({
              description: Joi.string(),
              form: Joi.object()
                .keys({
                  description: Joi.string(),
                  buttons: Joi.object()
                    .keys({
                      signIn: uiElement().required(),
                      registration: uiElement().required(),
                    })
                    .required(),
                  labels: Joi.object()
                    .keys({
                      description: Joi.string(),
                      password: uiElement().required(),
                      username: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
            })
            .required(),
          notFound: Joi.object()
            .keys({
              description: Joi.string(),
              title: uiElement().required(),
              text: uiElement().required(),
              return: uiElement().required(),
              link: uiElement().required(),
            })
            .required(),
          productCard: Joi.object()
            .keys({
              description: Joi.string(),
              button: uiElement().required(),
              outOfStock: uiElement().required(),
              share: uiElement().required(),
              bundlesTitle: uiElement().required(),
              labels: Joi.object()
                .keys({
                  description: Joi.string(),
                  language: uiElement().required(),
                  yearOfIssue: uiElement().required(),
                  publisher: uiElement().required(),
                  documentType: uiElement().required(),
                })
                .required(),
              popup: Joi.object()
                .keys({
                  description: Joi.string(),
                  header: uiElement().required(),
                  buttons: Joi.object()
                    .keys({
                      cart: uiElement().required(),
                      continue: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              socialLinks: Joi.object()
                .keys({
                  description: Joi.string(),
                  items: Joi.object()
                    .keys({
                      facebook: uiElement(),
                      twitter: uiElement(),
                      vkontakte: uiElement(),
                      instagram: uiElement(),
                    })
                    .required(),
                })
                .required(),
              previewImages: Joi.object().keys({
                description: Joi.string(),
                cropper: Joi.object()
                  .keys({
                    description: Joi.string(),
                    settings: uiSettings(),
                  })
                  .required(),
                slider: Joi.object()
                  .keys({
                    description: Joi.string(),
                    settings: uiSettings(),
                  })
                  .required(),
              }),
            })
            .required(),
          user: Joi.object()
            .keys({
              description: Joi.string(),
              account: Joi.object()
                .keys({
                  description: Joi.string(),
                  title: uiElement().required(),
                  button: uiElement().required(),
                  form: Joi.object()
                    .keys({
                      description: Joi.string(),
                      labels: Joi.object()
                        .keys({
                          email: uiElement().required(),
                          name: uiElement().required(),
                          surname: uiElement().required(),
                        })
                        .required(),
                      submit: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              purchases: Joi.object()
                .keys({
                  description: Joi.string(),
                  emptyStatus: uiElement().required(),
                  count: uiElement().required(),
                  title: uiElement().required(),
                })
                .required(),
              orders: Joi.object()
                .keys({
                  description: Joi.string(),
                  emptyStatus: uiElement().required(),
                  transaction: Joi.object()
                    .keys({
                      status: uiElement().required(),
                      details: uiElement().required(),
                    })
                    .required(),
                  button: uiElement().required(),
                  count: uiElement().required(),
                  title: uiElement().required(),
                  status: uiElement().required(),
                  paymentSuccess: uiElement().required(),
                  paymentWarning: uiElement().required(),
                  labels: Joi.object()
                    .keys({
                      description: Joi.string(),
                      date: uiElement().required(),
                      totalCount: uiElement().required(),
                      totalPrice: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
              orderDetails: Joi.object()
                .keys({
                  description: Joi.string(),
                  labels: Joi.object()
                    .keys({
                      count: uiElement().required(),
                      cost: uiElement().required(),
                    })
                    .required(),
                })
                .required(),
            })
            .required(),
        })
        .required(),
    })
    .required(),
  locales: Joi.object()
    .keys({
      main_language_code: Joi.string().required(),
      language_codes: Joi.array().required(),
    })
    .required(),
  sitemap: Joi.object()
    .keys({
      description: Joi.string(),
      cacheTime: Joi.number().required(),
    })
    .required(),
  robots: Joi.object()
    .keys({
      description: Joi.string(),
      value: Joi.array().required(),
    })
    .required(),
  routes: Joi.object()
    .keys({
      '/': routeElement().required(),
      '/catalog': routeElement().required(),
      '/login': routeElement().required(),
      '/product/:uid': routeElement().required(),
      '/cart': routeElement().required(),
      '/pages': Joi.object()
        .keys({
          description: Joi.string(),
          type: Joi.string(),
          robots: Joi.object(),
          meta: Joi.object(),
          routes: Joi.object()
            .keys({
              '/pages/personal_data_protection': routeElement().required(),
              '/pages/card_security': routeElement().required(),
              '/pages/privacy_policy': routeElement().required(),
              '/pages/terms_of_use': routeElement().required(),
            })
            .required(),
        })
        .required(),
      '/user': Joi.object()
        .keys({
          description: Joi.string(),
          type: Joi.string(),
          robots: Joi.object(),
          meta: Joi.object(),
          routes: Joi.object()
            .keys({
              '/user/account': routeElement().required(),
              '/user/purchases': routeElement().required(),
              '/user/orders': routeElement().required(),
            })
            .required(),
        })
        .required(),
    })
    .required(),
});
