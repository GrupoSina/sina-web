import { useProjectContext } from "@/context/ProjectContext";
import ProjectsService from "@/services/models/projects";
import { DragEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardStatus from "./CardStatus/CardStatus";

export default function ProjectsComponent() {
  const { fetchAllProjects, projects } = useProjectContext();
  const [draggedProject, setDraggedProject] = useState<IProject | null>(null);
  const [highlightedColumn, setHighlightedColumn] =
    useState<StatusProject | null>(null);


  async function handleUpdateStatusProject(id: string, status: StatusProject) {
    try {
      const { updateStatus } = await ProjectsService();
      await updateStatus(id, status);
      fetchAllProjects();
    } catch (error) {
      toast.error("Não foi possível atualizar o status do projeto.");
    }
  }

  function handleDragStart(project: IProject) {
    setDraggedProject(project);
  }

  function handleDrop(status: StatusProject) {
    if (draggedProject) {
      handleUpdateStatusProject(draggedProject.id, status);
      setDraggedProject(null);
      setHighlightedColumn(null);
    }
  }

  function allowDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDragEnter(
    event: DragEvent<HTMLDivElement>,
    status: StatusProject
  ) {
    const relatedTarget = event.relatedTarget as Node | null; 
    const currentTarget = event.currentTarget as Node; 

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    setHighlightedColumn(status);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    const relatedTarget = event.relatedTarget as Node | null; 
    const currentTarget = event.currentTarget as Node; 

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    setHighlightedColumn(null);
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex md:flex-row flex-col  gap-3 max-w-[760px] w-full md:justify-between md:items-start items-center">
        <div className="md:max-w-[260px] max-w-[220px] w-full">
          <CardStatus
            allowDrop={allowDrop}
            handleDragStart={handleDragStart}
            status={"WAITING"}
            handleDrop={handleDrop}
            projects={projects?.filter((item) => item.status === "WAITING")}
            highlightedColumn={highlightedColumn}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
          />
        </div>
        <div className="md:max-w-[260px] max-w-[220px] w-full">
          <CardStatus
            allowDrop={allowDrop}
            handleDragStart={handleDragStart}
            status={"IN_PROGRESS"}
            handleDrop={handleDrop}
            projects={projects?.filter((item) => item.status === "IN_PROGRESS")}
            highlightedColumn={highlightedColumn}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
          />
        </div>
        <div className="md:max-w-[260px] max-w-[220px] w-full">
          <CardStatus
            allowDrop={allowDrop}
            handleDragStart={handleDragStart}
            status={"DONE"}
            handleDrop={handleDrop}
            projects={projects?.filter((item) => item.status === "DONE")}
            highlightedColumn={highlightedColumn}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
          />
        </div>
      </div>
    </div>
  );
}