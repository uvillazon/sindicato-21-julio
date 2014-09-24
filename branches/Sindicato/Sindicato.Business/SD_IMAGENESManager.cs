using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_IMAGENESManager : Repository<SD_IMAGENES>
    {


        public SD_IMAGENESManager(IUnitOfWork uow) : base(uow) { }

        //test
        
    }
}
