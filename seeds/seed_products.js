export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("product").del();
  await knex("product").insert([
    {
      id: 1,
      name: "Apples",
      slug_name: "apple-1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg",
      category: "fruit",
      price: 599,
      stock: 10,
    },
    {
      id: 2,
      name: "Bananas",
      slug_name: "banana-2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://www.shutterstock.com/image-photo/bunch-bananas-isolated-on-white-600nw-1722111529.jpg",
      category: "fruit",
      price: 250,
      stock: 10,
    },
    {
      id: 3,
      name: "Cherry",
      slug_name: "cherry",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://m.media-amazon.com/images/I/51cRWnGNHbL._AC_UF894,1000_QL80_.jpg",
      category: "fruit",
      price: 100,
      stock: 10,
    },
    {
      id: 4,
      name: "Strawberry",
      slug_name: "strawberty",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://www.aishcart.in/5857-large_default/fresh-strawberry-box-500-gm.jpg",
      category: "fruit",
      price: 200,
      stock: 10,
    },
    {
      id: 5,
      name: "Guava",
      slug_name: "guava",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://hasiruagro.com/wp-content/uploads/2023/08/Guava-Taiwan-White.jpg",
      category: "fruit",
      price: 300,
      stock: 10,
    },
    {
      id: 6,
      name: "Dragon fruit",
      slug_name: "dragonfruit",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://impro.usercontent.one/appid/oneComShop/domain/myexoticfruit.com/media/myexoticfruit.com/webshopmedia/Dragon%20fruit%20red%20flesh-1581971974023.jpg?",
      category: "fruit",
      price: 1000,
      stock: 10,
    },
    {
      id: 7,
      name: "Watermelon",
      slug_name: "wateremon",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://weresmartworld.com/sites/default/files/styles/full_screen/public/2021-04/watermeloen_2.jpg",
      category: "fruit",
      price: 700,
      stock: 10,
    },
    {
      id: 8,
      name: "Grapes",
      slug_name: "grapes",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url: "https://img.thecdn.in/407526/SKU-0011_0-1730826528713.jpg",
      category: "fruit",
      price: 750,
      stock: 10,
    },
    {
      id: 9,
      name: "Pineapple",
      slug_name: "pineapple",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://findfresh.in/attachments/shop_images/pineapple-500x500.webp",
      category: "fruit",
      price: 599,
      stock: 10,
    },
    {
      id: 10,
      name: "Mango",
      slug_name: "mango",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image_url:
        "https://www.nutralion.com/wp-content/uploads/2024/05/Mango.jpg",
      category: "fruit",
      price: 450,
      stock: 10,
    },
  ]);
}
