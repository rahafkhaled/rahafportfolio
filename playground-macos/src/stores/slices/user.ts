
export interface UserSlice {
  typoraMd: string;
  setTyporaMd: (v: string) => void;
  faceTimeImages: {
    [date: string]: string;
  };
  addFaceTimeImage: (v: string) => void;
  delFaceTimeImage: (k: string) => void;
}

const loadFaceTimeImages = () => {
  const saved = localStorage.getItem('faceTimeImages');
  return saved ? JSON.parse(saved) : {};
};

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  typoraMd: `# Hi 👋\nThis is a simple clone of [Typora](https://typora.io/). Built on top of [Milkdown](https://milkdown.dev/), an open-source WYSIWYG markdown editor.`,
  setTyporaMd: (v) => set(() => ({ typoraMd: v })),
  faceTimeImages: loadFaceTimeImages(),
  addFaceTimeImage: (v) =>
    set((state) => {
      const images = { ...state.faceTimeImages };
      images[+new Date()] = v;
      localStorage.setItem('faceTimeImages', JSON.stringify(images));
      return { faceTimeImages: images };
    }),
  delFaceTimeImage: (k) =>
    set((state) => {
      const images = { ...state.faceTimeImages };
      delete images[k];
      localStorage.setItem('faceTimeImages', JSON.stringify(images));
      return { faceTimeImages: images };
    })
});
