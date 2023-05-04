import { api, type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaFolderOpen } from "react-icons/fa";
import Link from "next/link";
import { AiFillCloseSquare } from "react-icons/ai";

dayjs.extend(relativeTime);

type ProjectWithShowcase = RouterOutputs["projects"]["getAll"][number];

export const ProjectView = (props: ProjectWithShowcase) => {
  const ctx = api.useContext();
  const { project } = props;
  const { data } = api.showcases.getShowcaseById.useQuery({id: project.showcaseId})

  if (!data) return null

  const { mutate } = api.projects.delete.useMutation({
    onSuccess: () => {
      void ctx.projects.invalidate();
    }
  });

  function handleDelete() {
    mutate({
      id: project.id,
    });
  }

  const projectStyle = {
    "height": data.p_height.toString() + "px",
    "border": data.p_border_weight.toString() + "px solid" + data.p_border_color.toString(),
    "background-color": data.p_background,
    "border-radius": data.p_border_roundness.toString() + "px",
    "color": data.t_text_color,
  }

  const iconStyle = {
    "color": data.t_icon,
    "fontSize": data.t_icon_size,
  }

  const titleStyle = {
    "fontSize": data.t_title_size,
  }

  const descStyle = {
    "fontSize": data.t_description_size,
  }

  const linkStyle = {
    "fontSize": data.t_link_size,
  }
  
  return (
    <div key={project.id} className="grid relative">
    <Link
      href={project.link}
      style={projectStyle}
      className="group relative p-7 shadow-lg 
                transition hover:brightness-125"
    >
      <FaFolderOpen style={iconStyle} className="mb-4" />
      <h1 style={titleStyle} className="font-bold leading-3">{project.name}</h1>
      <p style={descStyle} className="mt-6 break-all leading-4">{project.description}</p>
      <div style={linkStyle} className="absolute bottom-9 inline-flex">
        {project.tag_1 && (
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2">
            {project.tag_1}
          </p>
        )}
        {project.tag_1 && (
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2">
            {project.tag_2}
          </p>
        )}
        {project.tag_1 && (
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2">
            {project.tag_3}
          </p>
        )}
      </div>
    </Link>
    <AiFillCloseSquare onClick={handleDelete} className="absolute -top-2 -right-2 text-4xl text-red-100 hover:cursor-pointer hover:brightness-75" />
    </div>
  );
};
