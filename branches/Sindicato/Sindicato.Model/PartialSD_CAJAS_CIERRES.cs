using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_CAJAS_CIERRES
    {
        public static Expression<Func<SD_CAJAS_CIERRES, bool>> Contiene(string contiene)
        {
            List<int> id = new List<int>();

            try
            {
                id.Add(Convert.ToInt32(contiene));
                return m => contiene == null || id.Contains(m.ID_CIERRE);
            }
            catch (FormatException)
            {
                return m => contiene == null ||
                             m.SD_CAJAS.NOMBRE.ToUpper().Contains(contiene.ToUpper());

            }
        }
    }

}
