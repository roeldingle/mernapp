import React from 'react'

function UserTableList(props) {
    
  return (
    <>
      {
          props.items.length > 0 ?
          (
              props.items.map((item, index) => (
                  <tr key={item._id}>
                      <th scope="row">{index+1}</th>
                      <td>{item.firstname +' '+ item.lastname}</td>
                      <td>{item.email}</td>
                      <td>{item.active ? 'Active' : 'Inactive'}</td>
                  </tr>
              ))

          ) 
          : (<h3>No items to show</h3>)
      }
    </>
  )
}

export default UserTableList