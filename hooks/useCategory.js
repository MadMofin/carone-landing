import { useContext } from 'react';
import CategoryContext from '../context/category/categoryContext';

const useCategory = () => useContext(CategoryContext);

export default useCategory;
