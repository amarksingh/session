import Command from '@ostro/console/command';

/**
 * Class SessionTableCommand.
 */
class SessionTableCommand extends Command {
    $signature: string = 'session:table';
    $description: string = 'Create a migration for the session database table';
    $files: any;

    /**
     * Create a new SessionTableCommand instance.
     *
     * @param $files - Filesystem service.
     */
    constructor($files: any) {
        super();
        this.$files = $files;
    }

    /**
     * Handle command execution.
     */
    async handle(): Promise<void> {
        const $fullPath: string = await this.createBaseMigration();
        await this.$files.put($fullPath, await this.$files.get(__dirname + '/stubs/database.stub'));

        this.info('Migration created successfully!');
    }

    /**
     * Create base migration file.
     *
     * @returns Created migration path.
     */
    createBaseMigration(): any {
        const $name: string = 'create_sessions_table';
        const $path: string = this.$app.databasePath('migrations');

        return this.$app['migration.creator'].create($name, $path);
    }
}

export = SessionTableCommand;