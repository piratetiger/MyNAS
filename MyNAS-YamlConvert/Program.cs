using System;
using System.IO;
using System.Linq;
using YamlDotNet.RepresentationModel;

namespace MyNAS_YamlConvert
{
    class Program
    {
        static void Main(string[] args)
        {
            var yamlPath = "docker-compose.yml";
            var configPath = "config/config.txt";

            var yaml = new YamlStream();
            string[] configs = null;

            if (File.Exists(yamlPath))
            {
                using (StreamReader rdr = File.OpenText(yamlPath))
                {
                    yaml.Load(rdr);
                }
            }
            if (File.Exists(configPath))
            {
                configs = File.ReadAllLines(configPath);
            }

            if (yaml.Documents.Count > 0 && configs != null && configs.Length > 0)
            {
                var mapping = (YamlMappingNode)yaml.Documents[0].RootNode;
                var services = mapping?.Children.FirstOrDefault(s => (s.Key as YamlScalarNode)?.Value == "services").Value as YamlMappingNode;

                if (services != null)
                {
                    var api = services.Children.FirstOrDefault(s => (s.Key as YamlScalarNode)?.Value == "api").Value as YamlMappingNode;
                    var site = services.Children.FirstOrDefault(s => (s.Key as YamlScalarNode)?.Value == "site").Value as YamlMappingNode;

                    if (api != null && site != null)
                    {
                        var api_volumes = new YamlSequenceNode();

                        var storage = configs.FirstOrDefault(c => c.StartsWith("storage_folder"))?.Replace("storage_folder=", string.Empty).Trim();
                        if (!string.IsNullOrWhiteSpace(storage))
                        {
                            api_volumes.Children.Add($"{storage}:/api/wwwroot/storage");
                        }

                        var db = configs.FirstOrDefault(c => c.StartsWith("db_folder"))?.Replace("db_folder=", string.Empty).Trim();
                        if (!string.IsNullOrWhiteSpace(db))
                        {
                            api_volumes.Children.Add($"{db}:/api/db_files");
                        }

                        var log = configs.FirstOrDefault(c => c.StartsWith("log_folder"))?.Replace("log_folder=", string.Empty).Trim();
                        if (!string.IsNullOrWhiteSpace(log))
                        {
                            api_volumes.Children.Add($"{log}:/api/logs");
                        }

                        if (api_volumes.Children.Count > 0)
                        {
                            var origin_api_volumes = api.Children.FirstOrDefault(s => (s.Key as YamlScalarNode)?.Value == "volumes").Value as YamlSequenceNode;
                            if (origin_api_volumes != null)
                            {
                                foreach (var child in api_volumes.Children)
                                {
                                    if (!origin_api_volumes.Children.Any(s => s.ToString() == child.ToString()))
                                    {
                                        origin_api_volumes.Children.Add(child);
                                    }
                                }
                            }
                            else
                            {
                                api.Children.Add(new YamlScalarNode("volumes"), api_volumes);
                            }
                        }

                        var site_ports = new YamlSequenceNode();

                        var port_string = configs.FirstOrDefault(c => c.StartsWith("site_port"))?.Replace("site_port=", string.Empty).Trim();
                        if (!string.IsNullOrWhiteSpace(port_string))
                        {
                            int port;
                            if (!Int32.TryParse(port_string, out port))
                            {
                                port = 80;
                            }
                            site_ports.Children.Add($"\"{port}:8080\"");
                        }

                        if (site_ports.Children.Count > 0)
                        {
                            var origin_site_ports = site.Children.FirstOrDefault(s => (s.Key as YamlScalarNode)?.Value == "ports").Value as YamlSequenceNode;
                            if (origin_site_ports != null)
                            {
                                foreach (var child in site_ports.Children)
                                {
                                    if (!origin_site_ports.Children.Any(s => s.ToString() == child.ToString()))
                                    {
                                        origin_site_ports.Children.Add(child);
                                    }
                                }
                            }
                            else
                            {
                                site.Children.Add(new YamlScalarNode("ports"), site_ports);
                            }
                        }
                    }
                }

                using (StreamWriter wtr = new StreamWriter(yamlPath))
                {
                    yaml.Save(wtr, false);
                }

                File.WriteAllText(yamlPath, File.ReadAllText(yamlPath).Replace("'\"", "\"").Replace("\"'", "\""));
            }
        }
    }
}
