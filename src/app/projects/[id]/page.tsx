import React from 'react'
import './page.css'
import { TaskStatus } from '@prisma/client';

const getProjDetails = async (id: number) => {
  const res = await fetch(`${process.env.API_HOST}/projects/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Fetch call failed!");
  }
  return await res.json();
}

const getProjTasks = async (id: number) => {
  const res = await fetch(`${process.env.API_HOST}/projects/${id}/tasks`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Fetch call failed!");
  }
  return await res.json();
  
}

const getHeading = (status: string) => {
  switch (status) {
    case TaskStatus.TODO: return 'To Do';
    case TaskStatus.IN_PROGRESS: return 'In Progress';
    case TaskStatus.REVIEW: return 'Review';
    case TaskStatus.COMPLETE: return 'Complete';
    default: return '';
  }
}

type Prop = {
  params: { id: string }
}

export default async function page({ params }: Prop) {
  const projDetails = await getProjDetails(+params?.id);
  // console.log(">>>>>>>projDetails", projDetails);

  const projTasks = await getProjTasks(+params?.id);
  // console.log(">>>>>>>tasks", tasks);
  

  return (
    <>
      <div className='container'>
        <span><h3>{projDetails.title}</h3></span>
        <span><button>+ New Task</button></span>
      </div>
      <div className="row">
        {
          Object.keys(TaskStatus).map(item => <>
            <div className="column">
              <h3>{getHeading(item)}</h3>
              <div className="tasks">
                {projTasks?.filter((task: any) => task.status === item)
                  .map((task: any) => <>
                    <p className='task'>{task.description}</p>
                  </>)}
              </div>
            </div>
          </>)}
      </div>
    </>
  )
}