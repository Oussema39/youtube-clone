import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import SmallSideBarItem from "../components/SmallSideBarItem";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
      <SmallSideBarItem Icon={Home} title="Home" url="/" />
      <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
      <SmallSideBarItem
        Icon={Clapperboard}
        title="Subscriptions"
        url="/subscriptions"
      />
      <SmallSideBarItem Icon={Library} title="Library" url="/library" />
    </aside>
  );
};

export default Sidebar;
