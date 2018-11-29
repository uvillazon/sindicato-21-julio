using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_DETALLES_DEUDAS
    {
        public string MOTIVO { get; set; }
        public static Expression<Func<SD_DETALLES_DEUDAS, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.ID_DETALLE) || id.Contains(m.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene.ToUpper());

            }
        }
    }

}
