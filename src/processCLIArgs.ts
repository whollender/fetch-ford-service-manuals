import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

export interface CLIArgs {
 configPath: string; outputPath: string; cookieString: string;
}

export default function processCLIArgs(): CLIArgs {
  const optionConfig = [
    {
      name: "configFile",
      alias: "c",
      type: String,
    },
    {
      name: "cookieString",
      alias: "s",
      type: String,
    },
    {
      name: "outputPath",
      alias: "o",
      type: String,
    },
    {
      name: "help",
      type: Boolean,
    },
  ];

  const sections = [
    {
      header: "Ford Workshop Manual Downloader",
      content:
        "Download the full Ford workshop manual for your car. Must have a valid PTS subscription.",
    },
    {
      header: "Options",
      optionList: [
        {
          name: "configFile -c",
          typeLabel: "{underline /path/to/config.json}",
          description: "{bold Required.} Path to your config file.",
        },
        {
          name: "cookieString -s",
          typeLabel: "{underline /path/to/cookieString.txt}",
          description: "{bold Required.} Path to the file that contains your PTS Cookie Header.",
        },
        {
          name: "outputPath -o",
          typeLabel: "{underline /path/for/manual}",
          description:
            "{bold Required.} Directory where you'd like the manual to download to. Should be an empty directory.",
        },
        {
          name: "help",
          description: "Print this usage guide.",
        },
      ],
    },
  ];
  
  const usage = commandLineUsage(sections);

  try {
    const options = commandLineArgs(optionConfig);
    if(options.help) {
      console.log(usage);
      process.exit(0);
    }

    if(!options.configFile || !options.outputPath || !options.cookieString) {
      console.error("Missing required args!");
      console.log(options);
      
      console.log(usage);
      process.exit(1);
    }
    return {
      configPath: options.configFile,
      outputPath: options.outputPath,
      cookieString: options.cookieString
    };
  } catch(e: any) {
    console.error(e);
    console.log(usage);
    process.exit(1);
  }
}