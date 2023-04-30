import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaFolderOpen } from "react-icons/fa";
import Link from "next/link";

dayjs.extend(relativeTime);

type ProjectWithShowcase = RouterOutputs["projects"]["getAll"][number];
export const ProjectView = (props: ProjectWithShowcase) => {
  const { project } = props;
  return (
    <Link
      href="some_link"
      key={project.id}
      className="group relative h-[280px] border border-white-100 p-7 text-white-100 shadow-lg transition hover:-translate-y-1
													hover:border-yellow-200 hover:text-yellow-200"
    >
      <FaFolderOpen className="mb-4 text-5xl" />
      <h1 className="text-lg font-bold leading-3">{project.name}</h1>
      <p className="text-md mt-6 break-all leading-4">{project.description}</p>
      <div className="absolute bottom-9 inline-flex text-sm">
        {project.tag_1 && (
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2 text-white-100 group-hover:bg-yellow-200/[0.2] group-hover:text-yellow-200">
            {project.tag_1}
          </p>
        )}
        {project.tag_1 && (
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2 text-white-100 group-hover:bg-yellow-200/[0.2] group-hover:text-yellow-200">
            {project.tag_2}
          </p>
        )}
        {project.tag_1 && (
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2 text-white-100 group-hover:bg-yellow-200/[0.2] group-hover:text-yellow-200">
            {project.tag_3}
          </p>
        )}
      </div>
    </Link>
  );
};