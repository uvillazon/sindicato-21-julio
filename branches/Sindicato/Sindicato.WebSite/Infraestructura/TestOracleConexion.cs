using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Sindicato.WebSite.Infraestructura
{
    public class TestOracleConexion
    {
        private string dataSource;
        private string username;
        private string password;

        public string CadenaConexion { get; set; }

        public string DataSource
        {
            set { dataSource = value; }
            get { return dataSource; }
        }

        public string Username
        {
            set { username = value; }
            get { return username; }
        }

        public string Password
        {
            set { password = value; }
            get { return password; }
        }

        /// <summary>
        /// Metodo utilizado para validad la conexion a una base de datos Oracle
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool TestConnection(string username, string password)
        {
            this.username = username;
            this.password = password;

            string[] parametrosConnectionString = CadenaConexion.Split(';');
            
            var dataSourceEncontrado = CadenaConexion.ToUpper().Split(';').FirstOrDefault(c => c.Contains("DATA SOURCE"));
            DataSource = dataSourceEncontrado.Substring(dataSourceEncontrado.IndexOf("DATA SOURCE") + 12);
            
            CadenaConexion = ConstruirCadenaConexion(parametrosConnectionString);

            //Se agrego referencia Oracle.DataAccess.Client para framework 4
            using (OracleConnection oracle = new OracleConnection())
            {
                try
                {
                    var CadenaConexion1 = string.Format("Data Source={0}; User Id={1}; Password={2}; Pooling=true; Min Pool Size=1; Max Pool Size=2; Connection Timeout=30", DataSource, Username, Password);
                    oracle.ConnectionString = CadenaConexion1;
                    oracle.Open();
                    return true;
                }
                catch
                {
                    return false;
                }
                finally 
                {
                    oracle.Close();
                    oracle.Dispose();
                }
            }
        }

        private string ConstruirCadenaConexion(string[] parametrosConnectionString)
        {
            StringBuilder nuevaCadenaConexion = new StringBuilder();

            try
            {
                foreach (string param in parametrosConnectionString)
                {
                    if (param.IndexOf("user id", StringComparison.InvariantCultureIgnoreCase) > -1)
                    {
                        nuevaCadenaConexion.AppendFormat("user id={0};", Username);
                    }
                    else if (param.IndexOf("password", StringComparison.InvariantCultureIgnoreCase) > -1)
                    {
                        nuevaCadenaConexion.AppendFormat("password={0};", Password);
                    }
                    else
                    {
                        nuevaCadenaConexion.Append(param + ';');
                    }
                }

                nuevaCadenaConexion.Replace(';', '"', nuevaCadenaConexion.Length - 1, 1);
                return nuevaCadenaConexion.ToString();
            }
            catch (Exception)
            {
                return CadenaConexion;                
            }
        }
    }
}