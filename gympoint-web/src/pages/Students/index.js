import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { Container, Menu, MenuBar, SearchBar, Content, Table } from './styles';

export default function Students() {
   const [students, setStudents] = useState([]);
   const [search, setSearch] = useState('');

   useEffect(() => {
      async function getStudents() {
         const { data } = await api.get('students');

         setStudents(data);
      }
      getStudents();
   }, []);

   async function handleDelete(id) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Deseja deletar este aluno?') === true) {
         await api.delete(`students/${id}`);

         toast.success('Aluno deletado com sucesso.');
         setStudents(students.filter(student => student.id !== id));
      }
   }

   function handleSearch(input) {
      setSearch(input);
   }

   async function handleKeyPress(key) {
      if (key === 'Enter') {
         const { data } = await api.get('students', {
            params: {
               name: search,
            },
         });
         setStudents(data);
      }
   }

   return (
      <Container>
         <Container>
            <Menu>
               <strong>Gerenciamento de alunos</strong>
               <MenuBar>
                  <button
                     type="button"
                     onClick={() => history.push('/students/details')}
                  >
                     <MdAdd size={24} />
                     CADASTRAR
                  </button>
               </MenuBar>
               <SearchBar>
                  <div>
                     <MdSearch size={24} />
                     <input
                        type="text"
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        onKeyPress={e => handleKeyPress(e.key)}
                        placeholder="Buscar aluno"
                     />
                  </div>
               </SearchBar>
            </Menu>
         </Container>

         <Content>
            <Table>
               <thead>
                  <tr>
                     <th>NOME</th>
                     <th>E-MAIL</th>
                     <th>IDADE</th>
                     <th>AÇÕES</th>
                  </tr>
               </thead>
               <tbody>
                  {students.map(student => (
                     <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.idade}</td>
                        <td>
                           <button
                              className="edit"
                              type="button"
                              onClick={() =>
                                 history.push(`/students/details/${student.id}`)
                              }
                           >
                              editar
                           </button>
                           <button
                              className="delete"
                              type="button"
                              onClick={() => handleDelete(student.id)}
                           >
                              apagar
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         </Content>
      </Container>
   );
}
