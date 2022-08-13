import * as fs from 'fs';
import * as path from 'path';
import chalk, { Chalk } from 'chalk'


class Log {
    public logPath: string;
    public currentDate: Date = new Date();

    constructor() {

        this.logPath = path.join(__dirname, '../logs/');

        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
    }

    private GetCurrentDate(): string {
        return new Date().toLocaleDateString().replace(/\//g, '-');
    }

    private GetCurrentTimeStamp(): string {
        return new Date().toLocaleString().replace(/\//g, '-');
    }

    public info(_string: string): void {
        this.addLog('INFO', _string);
    }

    public warn(_string: string): void {
        this.addLog('WARN', _string);
    }

    public error(_string: string): void {
        // Line break and show the first line
        console.log('\x1b[31m%s\x1b[0m', '[ERROR] :: ' + _string.split(/r?\n/)[0]);

        this.addLog('ERROR', _string);
    }

    private addLog(_kind: string, _string: string): void {
        const _that = this;
        _kind = _kind.toUpperCase();

        let logDate = this.GetCurrentTimeStamp();

        fs.open(`${_that.logPath}${this.GetCurrentDate()}.log`, 'a', (_err, _fileDescriptor) => {
            console.log(`[${chalk.magenta(logDate)}] [${chalk.cyan(_kind)}] ${_string}`);

            if (!_err && _fileDescriptor) {
                // Append to file and close it
                fs.appendFile(_fileDescriptor, `[${logDate}] [${_kind}] ${_string}\n`, (_err) => {
                    if (!_err) {
                        fs.close(_fileDescriptor, (_err) => {
                            if (!_err) {
                                return true;
                            } else {
                                return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended');
                            }
                        });
                    } else {
                        return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file');
                    }
                });
            } else {
                return console.log('\x1b[31m%s\x1b[0m', 'Error cloudn\'t open the log file for appending');
            }
        });
    }
}

export default new Log;