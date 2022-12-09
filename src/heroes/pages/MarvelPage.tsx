import React, { useContext } from 'react'
import { AuthContext } from '../../auth/context'
import { HeroList } from '../components/HeroList'

export const MarvelPage = () => {

  return (
    <>
      <HeroList publisher='Marvel Comics' />
    </>
  )
}
