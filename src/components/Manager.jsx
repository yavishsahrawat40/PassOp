import React from 'react'
import { useRef, useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordsArray, setPasswordsArray] = useState([])

  useEffect(() => {
    console.log(form)
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordsArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const showPassword = () => {
    passwordref.current.type = passwordref.current.type === "password" ? "text" : "password";
    ref.current.src = ref.current.src.includes("icons/hide.png") 
      ? "icons/show.png" 
      : "icons/hide.png";
  }

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]))
      console.log([...passwordsArray, form])
      setform({ site: "", username: "", password: "" })
      toast.success('Successfully saved!')
    } else {
      toast.error('Please fill all fields!')
    }
  }

  const deletePassword = (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordsArray(passwordsArray.filter(items => items.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(items => items.id !== id)))
      toast.success('Successfully deleted!')
    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
    setform(passwordsArray.find(i => i.id === id))
    deletePassword(id)
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 md:w-3/4 lg:w-2/3">
        <div className="text-center">
          <h1 className='text-black px-5 font-bold text-2xl sm:text-3xl'>
            <span className="text-blue-400">&lt;</span>Pass<span className='text-blue-400'>Op/&gt;</span>
          </h1>
          <p className='px-5 font-bold text-blue-400'>Your Own Password Manager</p>
        </div>
        
        <div className="flex flex-col gap-3 m-3">
          <input 
            value={form.site} 
            onChange={handleChange} 
            placeholder='Enter website URL' 
            className='rounded-full w-full border border-blue-600 p-2 text-black' 
            type="text" 
            name='site' 
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              value={form.username} 
              onChange={handleChange} 
              placeholder='Enter Username' 
              className='rounded-full border border-blue-600 text-black p-2 w-full' 
              type="text" 
              name='username' 
            />
            <div className="relative w-full">
              <input 
                ref={passwordref} 
                value={form.password} 
                onChange={handleChange} 
                placeholder='Enter Password' 
                className='rounded-full border border-blue-600 text-black p-2 w-full' 
                type="password" 
                name='password' 
              />
              <span 
                className="absolute right-2 top-2 cursor-pointer" 
                onClick={showPassword} 
              >
                <img ref={ref} className='p-1 w-8' src="icons/show.png" alt="" />
              </span>
            </div>
          </div>
          <button 
            onClick={savePassword} 
            className='flex justify-center items-center bg-blue-400 gap-2 hover:bg-blue-200 rounded-full px-4 py-2'
          >
            <lord-icon src="https://cdn.lordicon.com/zrkkrrpl.json" colors="primary:#242424,secondary:#000000" trigger="hover"></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords mt-6">
          <h2 className='font-bold text-xl sm:text-2xl'>Your Passwords</h2>
          {passwordsArray.length === 0 
            ? <div className='text-left'>No passwords saved</div> 
            : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className='bg-indigo-400'>
                    <tr>
                      <th className="px-2 py-2">Site</th>
                      <th className="px-2 py-2">Username</th>
                      <th className="px-2 py-2">Password</th>
                      <th className="px-2 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-indigo-100">
                    {passwordsArray.map((items) => (
                      <tr key={items.id}>
                        <td className="px-2 py-2 break-all">
                          <a href={items.site} target="_blank" rel="noopener noreferrer">
                            {items.site}
                          </a>
                        </td>
                        <td className="px-2 py-2">{items.username}</td>
                        <td className="px-2 py-2">{items.password}</td>
                        <td className="flex gap-2 justify-center px-2 py-2">
                          <img 
                            className='w-6 cursor-pointer' 
                            src="/icons/edit.svg" 
                            alt="Edit" 
                            onClick={() => editPassword(items.id)} 
                          />
                          <img 
                            className='w-6 cursor-pointer' 
                            src="/icons/delete.svg" 
                            alt="Delete" 
                            onClick={() => deletePassword(items.id)} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default Manager
