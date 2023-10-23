import React from 'react'
import Loader from '../Loader';
import { FaTrash } from 'react-icons/fa'
import { Table, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation} from '../../slices/usersApiSlice';

const UserListScreen = () => {

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        // Llama a la mutación para eliminar el usuario
        await deleteUser(id);
        // Refresca la lista de usuarios después de la eliminación
        toast.success('Usuario eliminado')
        refetch();
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la eliminación
        toast.error(error.message);
      }
    }
  };

     return (
        <>
          <h1 className='text-center'>Usuarios</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table striped bordered hover className='table-sm mt-3'>
              <thead>
                <tr className='text-center'>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className='text-center'>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Sí' : 'No'}</td>
                    <td>
                      {!user.isAdmin && (
                        <>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(user._id)}
                          >
                            <FaTrash style={{ color: 'white' }} />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      );
};

export default UserListScreen