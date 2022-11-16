import React from 'react'
import {useAuth} from '../../contexts/AuthContext';

export default function About() {
const { currentUser } = useAuth();


  return (
    <div>{currentUser.uid}</div>
  )
}
