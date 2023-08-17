
import React, { useEffect, useState } from 'react'
import { Prisma } from "@prisma/client";
import { NextResponse } from 'next/server';
import { error } from 'console';
import './Projects.css'
import Project from '../Project/Project';

const getProjects = async () => {
  console.log(`>>>>>process.env.API_HOST: ${process.env.API_HOST}`);

  const res = await fetch(`${process.env.API_HOST}/projects`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Fetch call failed!");
  }
  return await res.json();
}

export default async function Projects() {
  // const [Projects, setProjects] = useState<Prisma.ProjectSelect>();


  const projects = await getProjects();
  // console.dir(projects);
  
  return (
    <>
      <div className='container'>
        <span>ALL PROJECTS ({projects?.length ?? 0})</span>
        <span>SORT BY: DUE DATE</span>  
      </div>
      <br />
      <div>
        {
          projects.map((proj: any) => <Project key={proj?.id} proj={proj}></Project>)
        }
      </div>
    </>
  )
}
