import { fetchAllProjects } from "@/app/admin/actions";
import { CircularProgress, Spinner } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

interface ProjectsOverviewProps {
  selectedClient?: ICustomer | undefined;
}

export default function ProjectsOverview({
  selectedClient,
}: ProjectsOverviewProps) {
  const { "sina:x-token": sessionKey } = parseCookies();

  const [allProjectsState, setAllProjectsState] = useState<IProject[]>([]);
  const [projectsPercentage, setProjectsPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchAllProjects = async (token: string) => {
    const { projects } = await fetchAllProjects(token);
    return projects;
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let data: IProject[] | undefined = [];
      if (selectedClient) {
        data = selectedClient.projects;
      } else {
        data = await handleFetchAllProjects(sessionKey);
      }

      setAllProjectsState(data || []);
      const allProjectsLength = data?.length || 0;

      const doneProjects = data?.filter(
        (project) => project.statusProject === "DONE",
      );

      handleProjectsPercentage(allProjectsLength, doneProjects?.length || 0);
    };

    fetchData().finally(() => setIsLoading(false));
  }, [selectedClient, sessionKey]);

  const handleProjectsPercentage = (
    allProjectsLength: number,
    doneProjects: number,
  ) => {
    if (allProjectsLength === 0) {
      setProjectsPercentage(0);
    } else {
      const percentage = (doneProjects / allProjectsLength) * 100;
      setProjectsPercentage(percentage);
    }
  };

  return (
    <div className="flex w-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full flex flex-col items-center space-x-4 p-4 bg-white border-solid border-[1px] border-[#DDE1E6] pr-8">
          <h1 className="text-[18px] font-bold mb-4">Projetos</h1>
          <div className="flex justify-start items-center space-x-6">
            <CircularProgress
              aria-label=""
              size="lg"
              value={projectsPercentage}
              color="success"
              showValueLabel={true}
              strokeWidth={4}
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-[#697077]",
                track: "stroke-[#DDE1E6]",
                value: "text-3xl font-semibold text-[#697077]",
              }}
            />
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-4">
                <div className="w-5 h-5 bg-[#697077] rounded-full" />
                <h1>Concluídos</h1>
              </div>
              <div className="flex space-x-4">
                <div className="w-5 h-5 bg-[#DDE1E6] rounded-full" />
                <h1>Em andamento </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
