// Types
import { WorkspaceType } from "../types";

export default class ResponseWorkspace {
  workspace: WorkspaceType | null;

  constructor(workspace: WorkspaceType | null) {
    if (workspace) {
      this.workspace = {
        _id: workspace._id,
        administrators: workspace.administrators,
        users: workspace.users,
        name: workspace.name,
        settings: {
          allowUsersToCreate: workspace.settings?.allowUsersToCreate,
          workspaceColor: workspace.settings?.workspaceColor,
        },
      };
    } else {
      this.workspace = null;
    }
  }

  getWorkspace: any = () => {
    return {
      _id: this.workspace?._id,
      administrators: this.workspace?.administrators,
      users: this.workspace?.users,
      name: this.workspace?.name,
      settings: {
        allowUsersToCreate: this.workspace?.settings?.allowUsersToCreate,
        workspaceColor: this.workspace?.settings?.workspaceColor,
      },
    };
  };
}
