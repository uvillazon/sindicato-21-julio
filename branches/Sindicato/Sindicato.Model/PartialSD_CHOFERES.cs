using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_CHOFERES
    {
        public static Expression<Func<SD_CHOFERES, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.NRO_CHOFER);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.NOMBRE.ToUpper().Contains(contiene.ToUpper()) ||
                             m.APELLIDO_MATERNO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.APELLIDO_PATERNO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.ESTADO.ToUpper().Contains(contiene.ToUpper()) ||
                             m.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene.ToUpper())||
                             m.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene.ToUpper())||
                             m.DOMICILIO.ToUpper().Contains(contiene.ToUpper());
            }
        }
    }

}
