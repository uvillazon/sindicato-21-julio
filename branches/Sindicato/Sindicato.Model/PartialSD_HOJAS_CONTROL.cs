using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_HOJAS_CONTROL
    {
        public static Expression<Func<SD_HOJAS_CONTROL, bool>> Contiene(string contiene)
        {
           
           
                return m => contiene == null ||
                             m.SD_MOVILES.NRO_MOVIL.ToString().Contains(contiene.ToUpper()) ||
                             m.SD_MOVILES.SD_LINEAS.NRO_LINEA.ToString().ToUpper().Contains(contiene.ToUpper()) ||
                             m.ESTADO.ToUpper().Contains(contiene.ToUpper())
                             ;
           
        }
    }

}
