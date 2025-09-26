
export interface SubCategory {
  id: string;
  name: string;
  image: string;
}

export interface CategorySection {
  title: string;
  items: SubCategory[];
}

export interface MainCategory {
  id: string;
  name: string;
  sections: CategorySection[];
}

export const CATEGORY_DATA: MainCategory[] = [
  {
    id: 'recommend',
    name: 'Recommend',
    sections: [
      {
        title: 'Recommend',
        items: [
          { id: 'dresses', name: 'Dresses', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-17313328963948wyJsPMynZ.jpg?x-oss-process=style/p_list' },
          { id: 'sneakers', name: 'Sneakers', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1688102425944h2CRFnMabc.jpg?x-oss-process=style/p_list' },
          { id: 'backpacks', name: 'Backpacks', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-68115637173082264.jpg?x-oss-process=style/p_list' },
          { id: 'sets', name: 'Sets', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-2694583967127223.jpg?x-oss-process=style/p_list' },
          { id: 'makeup', name: 'Makeup Tools', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1687248188838ZDDA8fwRrp.jpg?x-oss-process=style/p_list' },
          { id: 'sandals', name: 'Sandals & Flip Flops', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1703399724618TGcMfXz4KS.jpg?x-oss-process=style/p_list' },
        ],
      },
      {
        title: 'Hot',
        items: [
          { id: 'wigs', name: 'Wigs', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1687248188838ZDDA8fwRrp.jpg?x-oss-process=style/p_list' },
          { id: 'personal', name: 'Personal Care Appli...', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-1645017216504.jpeg?x-oss-process=style/p_list' },
          { id: 'briefcases', name: 'Briefcases', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-27478080774349329.jpg?x-oss-process=style/p_list' },
          { id: 'hair', name: 'Hair Weft & Closure', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-30592963922830963.jpg?x-oss-process=style/p_list' },
          { id: 'tops', name: 'Tops & Tees', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1718220529355NnYsCBHZs3.jpg?x-oss-process=style/p_list' },
          { id: 'headphones', name: 'Headphones & Earphones', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-2694583967127223.jpg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'clothing',
    name: 'Clothing',
    sections: [
       {
        title: 'Women\'s Fashion',
        items: [
          { id: 'dresses', name: 'Dresses', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1721798455110twC5b2TFCM.jpg?x-oss-process=style/p_list' },
          { id: 'tops', name: 'Tops & Tees', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-30592963922830963.jpg?x-oss-process=style/p_list' },
          { id: 'skirts', name: 'Skirts', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1724404684666M5Hwsh8zec.jpg?x-oss-process=style/p_list' },
        ]
      }
    ],
  },
  {
    id: 'shoes',
    name: 'Shoes',
    sections: [
      {
        title: 'All Shoes',
        items: [
          { id: 'sneakers', name: 'Sneakers', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-70242390960288579.jpg?x-oss-process=style/p_list' },
          { id: 'sandals', name: 'Sandals', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1710319550459jkSwewZdK5.jpg?x-oss-process=style/p_list' },
          { id: 'heels', name: 'Heels', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-1631200785736.jpeg?x-oss-process=style/p_list' },
        ]
      }
    ]
  },
  {
    id: 'luggage_bags',
    name: 'Luggage & Bags',
    sections: [
        {
            title: 'Bags',
            items: [
                 { id: 'backpacks', name: 'Backpacks', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-41819379530307149.jpg?x-oss-process=style/p_list' },
                 { id: 'sets', name: 'Sets', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1676466868510rr5NQJdEer.jpg?x-oss-process=style/p_list' },
                 { id: 'briefcases', name: 'Briefcases', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1756351305609rjNyx36yAk.jpg?x-oss-process=style/p_list' },
            ]
        }
    ]
  },
  {
    id: 'watch_jewelry',
    name: 'Watch & Jewelry',
    sections: [
      {
        title: 'Popular',
        items: [
          { id: 'watches', name: 'Watches', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1697963749950we4aNaf3mw.jpg?x-oss-process=style/p_list' },
          { id: 'necklaces', name: 'Necklaces', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1720688816294e7GbEB5ntD.png?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'kids_toys',
    name: 'Kids & Toys',
    sections: [
      {
        title: 'For Kids',
        items: [
          { id: 'toys', name: 'Toys', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1680792754273M6GQWEFKwQ.jpg?x-oss-process=style/p_list' },
          { id: 'baby_clothing', name: 'Baby Clothing', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-66356823317072867.jpg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'home_appliances',
    name: 'Home & Appliances',
    sections: [
      {
        title: 'Home Goods',
        items: [
          { id: 'kitchen', name: 'Kitchen', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-60427454475103717.jpg?x-oss-process=style/p_list' },
          { id: 'appliances', name: 'Appliances', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-1554705376208.jpeg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty',
    sections: [
      {
        title: 'Skincare',
        items: [
          { id: 'moisturizers', name: 'Moisturizers', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1652846228614t4FYM8AnFC.jpg?x-oss-process=style/p_list' },
          { id: 'makeup_sets', name: 'Makeup Sets', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-72533048606340760.jpg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'weddings',
    name: 'Weddings',
    sections: [
      {
        title: 'Wedding Essentials',
        items: [
          { id: 'dresses', name: 'Dresses', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1683299189138dymzFY8XDh.jpg?x-oss-process=style/p_list' },
          { id: 'decorations', name: 'Decorations', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-1512726318070.jpeg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'hair',
    name: 'Hair',
    sections: [
      {
        title: 'Hair Care',
        items: [
          { id: 'wigs', name: 'Wigs', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-77980739725621323.jpg?x-oss-process=style/p_list' },
          { id: 'hair_extensions', name: 'Hair Extensions', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-75448650681258391.jpg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'phones_tel',
    name: 'Phones & Tel',
    sections: [
      {
        title: 'Mobile Devices',
        items: [
          { id: 'smartphones', name: 'Smartphones', image: 'https://global2019-static-cdn.kikuu.com/k-s-oss-1754132123389tks24wSnrj.jpg?x-oss-process=style/p_list' },
          { id: 'accessories', name: 'Accessories', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-56622273346738564.jpg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    sections: [
      {
        title: 'Gadgets',
        items: [
          { id: 'headphones', name: 'Headphones', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-29367259476397192.jpg?x-oss-process=style/p_list' },
          { id: 'speakers', name: 'Speakers', image: 'https://global2019-static-cdn.kikuu.com/upload-productImg-94849109623226151.jpg?x-oss-process=style/p_list' },
        ],
      },
    ],
  },
];