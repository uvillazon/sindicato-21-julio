using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_MOVILES
    {
        public static Expression<Func<SD_MOVILES, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.NRO_MOVIL);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.OBSERVACION.ToUpper().Contains(contiene.ToUpper()) ||
                             m.DESCRIPCION.ToUpper().Contains(contiene.ToUpper());
            }
        }
    }

}
