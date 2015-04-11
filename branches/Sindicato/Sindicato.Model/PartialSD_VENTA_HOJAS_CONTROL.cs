using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_VENTA_HOJAS_CONTROL
    {
        public static Expression<Func<SD_VENTA_HOJAS_CONTROL, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.ID_VENTA)||id.Contains(m.NRO_MOVIL);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.ESTADO.ToUpper().Contains(contiene.ToUpper());
            }
        }
    }

}
