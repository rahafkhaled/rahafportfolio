const files = [
  {
    id: "documents",
    title: "Documents",
    icon: "/logo/thisfolder.svg",
    type: "folder",
    x: 100,
    y: 100,
    onOpen: () => {
      // This will be used to open the artwork gallery
      const artworkGalleryId = "artwork-gallery";
      return artworkGalleryId;
    }
  }
];

export default files; 