//Q1LRrDcJTM8V4nC9 mongodb
//mongodb+srv://neepushre97:<password>@cluster0.8qzxx.mongodb.net/
export const navOptions = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "listingMen",
    label: "Men",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Women",
    path: "/product/listing/women",
  },
  {
    id: "listingKids",
    label: "kids",
    path: "/product/listing/kids",
  },
];

export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
];


export const registrationFormControls = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Enter your Name',
    label: 'Name',
    componentType: 'input'
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Enter your Email',
    label: 'Email',
    componentType: 'input'
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your Password',
    label: 'Password',
    componentType: 'input'
  },
  {
    id: 'role',
    type: '',
    placeholder: '',
    label: 'Role',
    componentType: 'select',
    options: [
      {
        id: 'admin',
        label: 'Admin'
      },
      {
        id: 'customer',
        label: 'Customer'
      }
    ]
  }
]

export const loginFormcontrols=[
  {
    id: 'email',
    type: 'email',
    placeholder: 'Enter your Email',
    label: 'Email',
    componentType: 'input'
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Enter your Password',
    label: 'Password',
    componentType: 'input'
  },
]

export const adminAddProductformControls =[
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter Description",
    label: "Description",
    componentType: "input",
  },
  
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options:[
      {
        id:'men',
        label:'men'
      },
      {
        id:'women',
        label:'Women'
      },
      {
        id:'kids',
        label:'kids'
      },

    ]
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter pricedrop ",
    label: "Price Drop",
    componentType: "input",
  },
  
]
export const AvailableSizes=[
  {
    id:'s',
    label:'S'
  },
  {
    id:'m',
    label:'M'
  },
  {
    id:'l',
    label:'L'
  },
]

export const AddnewAddressFormControls =[
  {
    id:'fullName',
    type:'input',
    placeholder:'Enter your fullname',
    label:'Full Name',
    componentType:'input'
  },
  {
    id:'address',
    type:'input',
    placeholder:'Enter your full address',
    label:'Address',
    componentType:'input'
  },
  {
    id:'city',
    type:'input',
    placeholder:'Enter your city',
    label:'City',
    componentType:'input'
  },
  {
    id:'country',
    type:'input',
    placeholder:'Enter your country',
    label:'Country',
    componentType:'input'
  },
  {
    id:'postalCode',
    type:'input',
    placeholder:'Enter your Postal Code',
    label:'Postal Code',
    componentType:'input'
  }
]

export const firebaseConfig = {
  apiKey: "",
  authDomain: "next-js-ecommerce-7404c.firebaseapp.com",
  projectId: "next-js-ecommerce-7404c",
  storageBucket: "next-js-ecommerce-7404c.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
export const firebaseStorageURL= 'gs://next-js-ecommerce-7404c.appspot.com'
