"use client"

import AddCategory from "@/components/AddCategory/AddCategory";
import CategoryTable from "@/components/CategoryTable/CategoryTable";
import { useCategoriesQuery } from "@/redux/api/categoryApi";

const Category = () => {
    const {data} = useCategoriesQuery(undefined);
    console.log(data);
    const categoryData = data?.data;
    console.log(categoryData);
    return (
        <>
        <AddCategory/>
        <CategoryTable categories={categoryData}/>
        </>
    );
};

export default Category;