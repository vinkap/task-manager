import React from 'react'
import { Prisma, TaskStatus } from '@prisma/client'

import './Project.css'
import Link from 'next/link'

type Prop = {
  proj: any // Bad!! Don't currently understand why Prisma.ProjectSelect has all its fields typed as a Boolean!!
}

export default function Project({ proj }: Prop) {
  return (
    <>
      <div className='proj-container'>
        <Link href={`projects/${proj.id}`}>
          <h3>PROJECT: {proj.title}</h3>
        </Link>
        <div className='due-date'>
          <span>DUE DATE: {Intl.DateTimeFormat('en-us',
            {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit'
            })
            .format(new Date(proj?.dueDate))}
          </span>
          <span>
            {/* Not sure what the slider maps to */}
          </span>
        </div>
      </div>
      <br />
    </>
  )
}
