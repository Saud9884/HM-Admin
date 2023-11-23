import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');

    useEffect(() => {
       fetchCategories();
    }, []);

    function fetchCategories() {
        axios
        .get("/api/categories")
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }

    async function saveCategory(e) {
        e.preventDefault();
        await axios.post('/api/categories', {name,parentCategory});
        setName('');
        fetchCategories();
    }

    function editCategory(category) {
            setEditedCategory(category);
            setName(category.name);
            setParentCategory(category.parent?._id);
    }

    return(
       <Layout>
        <h1>Categories</h1>

        <div className="mt-4">
        <label>{editedCategory ? `Edit Category : ${editedCategory.name}` : "Add New Category"}</label>
        <form onSubmit={saveCategory} className="flex gap-4">
        <input className="mb-0" type="text" placeholder="Enter Name of the Category" value={name} onChange={e => setName(e.target.value)}/>

        <select className="mb-0"
            value={parentCategory}
            onChange={e => setParentCategory(e.target.value)}>
            <option value="">No Parent category</option>
            {categories.length > 0 && categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                ))}
        </select>

        <button type="submit" className="btn-black">Save</button>
        </form>
        </div>
        
        <table className="mt-8">
            <thead>
                <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    <td>Options</td>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 && categories.map(category => (
                    <tr>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <button onClick={() => editCategory(category)}
                            className="btn-default mr-2">Edit</button>
                            <button className="btn-red">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </Layout>
    );
}