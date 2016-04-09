using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_SOCIO_MOVILES
    {
        public int NRO_MOVIL { get; set; }
        public string ObtenerNombreSocio() {
            return string.Format("{0} {1} {2}", SD_SOCIOS.NOMBRE, SD_SOCIOS.APELLIDO_PATERNO, SD_SOCIOS.APELLIDO_MATERNO);
        }
        public static Expression<Func<SD_SOCIO_MOVILES, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.SD_MOVILES.NRO_MOVIL);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIOS.ESTADO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIOS.DOMICILIO.ToUpper().Contains(contiene.ToUpper());
            }
        }
    }

}
