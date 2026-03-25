// Product data for VarLoc event rental site
const PRODUCTS = {
  sono: [
    {
      id: 'sono-2000w',
      name: 'Sono portable 2000W',
      price: 50,
      unit: '/ jour',
      description: 'Sonorisation puissante pour tous types d\'événements.',
      discountEligible: true,
      supplements: [],
      category: 'Sonorisation et animation'
    },
    {
      id: 'jeux-lumieres',
      name: 'Jeux de lumières',
      price: 15,
      unit: '/ jour',
      description: 'Ambiance lumineuse festive pour vos soirées.',
      discountEligible: false,
      supplements: [],
      category: 'Sonorisation et animation'
    },
    {
      id: 'micro-sans-fil',
      name: 'Micro sans fil',
      price: 8,
      unit: '/ jour',
      description: 'Micro sans fil pour discours, animations et karaoké.',
      discountEligible: false,
      supplements: [],
      category: 'Sonorisation et animation'
    },
    {
      id: 'machine-fumee',
      name: 'Machine à fumée',
      price: 15,
      unit: '/ jour',
      description: 'Effet brouillard pour une ambiance spectaculaire.',
      discountEligible: false,
      supplements: [
        { label: 'Liquide à fumée', detail: '5 € / litre' }
      ],
      category: 'Sonorisation et animation'
    },
    {
      id: 'machine-bulles',
      name: 'Machine à bulles',
      price: 15,
      unit: '/ jour',
      description: 'Machine à bulles pour une touche féérique.',
      discountEligible: false,
      supplements: [
        { label: 'Liquide à bulles', detail: '5 € / litre' }
      ],
      category: 'Sonorisation et animation'
    }
  ],
  festive: [
    {
      id: 'barbe-a-papa',
      name: 'Machine à barbe à papa',
      price: 40,
      unit: '/ jour',
      description: 'Régalez vos invités avec de la barbe à papa maison.',
      discountEligible: true,
      supplements: [
        { label: 'Sucre', detail: '10 € le pot de 500 g' },
        { label: 'Option nettoyage', detail: '20 €' }
      ],
      category: 'Machines festives'
    },
    {
      id: 'pop-corn',
      name: 'Machine à pop-corn',
      price: 40,
      unit: '/ jour',
      description: 'Pop-corn frais pour tous vos événements.',
      discountEligible: true,
      supplements: [
        { label: 'Pack maïs + pots', detail: 'à partir de 12 € pour 20 pers.' },
        { label: 'Option nettoyage', detail: '20 €' }
      ],
      category: 'Machines festives'
    }
  ],
  reception: [
    {
      id: 'guinguette',
      name: 'Guirlande guinguette',
      price: 10,
      unit: '/ jour',
      description: 'Guirlande lumineuse ambiance guinguette.',
      discountEligible: false,
      supplements: [],
      category: 'Réception et extérieur'
    },
    {
      id: 'machine-glacons',
      name: 'Machine à glaçons',
      price: 15,
      unit: '/ jour',
      description: 'Production de glaçons pour vos boissons.',
      discountEligible: false,
      supplements: [],
      category: 'Réception et extérieur'
    },
    {
      id: 'barnum',
      name: 'Barnum 3 m x 3 m',
      price: 35,
      unit: '/ jour',
      description: 'Tente barnum pour vos événements en extérieur.',
      discountEligible: true,
      supplements: [
        { label: 'Transport', detail: 'à partir de 35 € (rayon 20 km)' }
      ],
      category: 'Réception et extérieur'
    },
    {
      id: 'barrieres-heras',
      name: 'Barrières Héras',
      price: null,
      priceLabel: 'à partir de 1 € HT / ml',
      unit: '',
      description: 'Barrières de sécurité pour délimiter vos espaces.',
      discountEligible: false,
      supplements: [
        { label: 'Tarif dégressif', detail: 'selon quantité et durée' },
        { label: 'Livraison possible', detail: 'selon lieu et quantité' }
      ],
      category: 'Réception et extérieur',
      quoteOnly: true
    }
  ],
  pro: [
    {
      id: 'retroprojecteur',
      name: 'Rétroprojecteur',
      price: 35,
      unit: '/ jour',
      description: 'Vidéoprojecteur pour présentations et projections.',
      discountEligible: true,
      supplements: [],
      category: 'Matériel professionnel'
    }
  ],
  vaisselle: [
    {
      id: 'assiette-27',
      name: 'Assiette 27 cm',
      price: 0.45,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'assiette-19',
      name: 'Assiette 19 cm',
      price: 0.40,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'fourchette',
      name: 'Fourchette',
      price: 0.30,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'couteau',
      name: 'Couteau',
      price: 0.30,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'petite-cuillere',
      name: 'Petite cuillère',
      price: 0.25,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'cuillere-soupe',
      name: 'Cuillère à soupe',
      price: 0.30,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'verre-vin',
      name: 'Verre à vin',
      price: 0.40,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'verre-eau',
      name: 'Verre à eau',
      price: 0.40,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'flute',
      name: 'Flûte',
      price: 0.40,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'tasse-cafe',
      name: 'Tasse à café',
      price: 0.40,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'sous-tasse',
      name: 'Sous-tasse',
      price: 0.30,
      unit: '/ unité TTC',
      description: '',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true
    },
    {
      id: 'pack-assiettes-couverts',
      name: 'Pack assiettes + couverts',
      price: 1.50,
      unit: '/ personne',
      description: 'Assiettes et couverts complets par personne.',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true,
      isPack: true
    },
    {
      id: 'pack-verres-cafe',
      name: 'Pack verres + café',
      price: 1.50,
      unit: '/ personne',
      description: 'Verres et service café par personne.',
      discountEligible: false,
      supplements: [],
      category: 'Vaisselle',
      quantityBased: true,
      isPack: true
    }
  ],
  photo: [
    {
      id: 'borne-miroir',
      name: 'Borne miroir Photobooth',
      price: 300,
      unit: '',
      description: 'Borne photo interactive pour des souvenirs inoubliables.',
      discountEligible: true,
      supplements: [
        { label: 'Livraison', detail: '50 € (rayon 20 km)' }
      ],
      category: 'Photobooth',
      hasOptions: true,
      options: [
        { label: 'Version numérique', price: 300 },
        { label: 'Avec 200 tirages', price: 450 },
        { label: 'Avec 400 tirages', price: 600 }
      ]
    }
  ]
};

// Discount tiers based on number of discount-eligible items selected
// The more premium items selected, the higher the discount
function getDiscountPercent(eligibleCount) {
  if (eligibleCount >= 6) return 15;
  if (eligibleCount >= 5) return 12;
  if (eligibleCount >= 4) return 10;
  if (eligibleCount >= 3) return 7;
  if (eligibleCount >= 2) return 5;
  return 0;
}

// Get all products as a flat array
function getAllProducts() {
  const all = [];
  for (const category of Object.values(PRODUCTS)) {
    for (const product of category) {
      all.push(product);
    }
  }
  return all;
}
